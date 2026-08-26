import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getMockAssessmentResult } from "@/lib/mock-data";
import { AssessmentResult, QuestionEntry } from "@/types/assessment";

function extractMimeAndBase64(dataUrlOrBase64: string): { mimeType: string; data: string } {
  if (dataUrlOrBase64.startsWith("data:")) {
    const commaIndex = dataUrlOrBase64.indexOf(";base64,");
    if (commaIndex !== -1) {
      const mimeType = dataUrlOrBase64.substring(5, commaIndex) || "image/jpeg";
      const data = dataUrlOrBase64.substring(commaIndex + 8);
      return { mimeType, data };
    }
  }
  return {
    mimeType: "image/jpeg",
    data: dataUrlOrBase64,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      questionPaperImages = [],
      answerSheetImages = [],
      apiKey: userApiKey,
      isDemo = false,
    } = body;

    // Explicit Demo mode returns verified sample benchmark data
    if (isDemo) {
      const mock = getMockAssessmentResult();
      return NextResponse.json({ success: true, data: mock });
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    // If API key is missing for live upload processing, do NOT silently fall back to mock data
    if (!apiKey) {
      console.error("Gemini API key is missing. AI processing is not configured.");
      return NextResponse.json(
        {
          success: false,
          error: "AI processing is not configured. Please add your Gemini API key.",
          code: "MISSING_API_KEY",
        },
        { status: 400 }
      );
    }

    if (questionPaperImages.length === 0 || answerSheetImages.length === 0) {
      console.error("Missing question paper or answer sheet images for processing.");
      return NextResponse.json(
        {
          success: false,
          error: "Question paper and answer sheet images are required for processing.",
          code: "MISSING_IMAGES",
        },
        { status: 400 }
      );
    }

    // Live AI Processing via Gemini
    const genAI = new GoogleGenerativeAI(apiKey);

    const prompt = `You are VedaAI, an expert AI Assessment Extraction, Handwriting OCR, and Grading Engine for teachers.

TASK:
1. Examine the uploaded Question Paper images and extract ALL printed questions in exact sequence.
2. IMPORTANT: Treat labelled sub-parts as separate questions (e.g. "11 (a)" and "11 (b)" must be separate entries with questionNumber: "11", subPart: "a" / "b", fullLabel: "11 a.").
3. Examine the student handwritten Answer Sheet images. Transcribe student answers, formulas, and diagrams.
4. Detect the exact bounding box for each answer on the answer sheet [ymin, xmin, ymax, xmax] on a normalized 0-1000 scale (where ymin=0 is top, ymax=1000 is bottom, xmin=0 is left, xmax=1000 is right).
5. Map each question to its corresponding handwritten answer. Handle answers written out of order or spanning multiple pages.
6. Identify any questions that were left UNANSWERED by the student (awardedMarks: 0, status: "UNANSWERED", evaluation: "NOT_ATTEMPTED").
7. Identify any student writing that does not match any question on the question paper (list under unmatchedAnswers).
8. Grade each answer with awardedMarks out of maxMarks, and provide constructive "aiFeedback" and keyConcepts.

Return a STRICT JSON object matching this schema:
{
  "title": "Exam Title (e.g. Class 10 Biology / Physics Midterm)",
  "subject": "Subject Name",
  "gradeLevel": "Grade Level",
  "studentName": "Student Name",
  "questions": [
    {
      "id": "q-1",
      "questionNumber": "1",
      "subPart": null,
      "fullLabel": "1",
      "printedOrder": 1,
      "questionText": "Question text here",
      "maxMarks": 2,
      "awardedMarks": 2,
      "status": "ANSWERED",
      "evaluation": "CORRECT",
      "aiFeedback": "Constructive pedagogical feedback",
      "keyConcepts": ["Concept 1", "Concept 2"],
      "matchedAnswer": {
        "answerText": "Transcribed handwritten answer",
        "pageNumbers": [1],
        "isMultiPage": false,
        "confidenceScore": 0.95,
        "detectedHeader": "Q1.",
        "boundingBoxes": [
          {
            "pageNumber": 1,
            "ymin": 100,
            "xmin": 50,
            "ymax": 300,
            "xmax": 750,
            "label": "Q1"
          }
        ]
      }
    }
  ],
  "unmatchedAnswers": [
    {
      "id": "unmatched-1",
      "pageNumber": 1,
      "boundingBox": {
        "pageNumber": 1,
        "ymin": 800,
        "xmin": 50,
        "ymax": 950,
        "xmax": 750,
        "label": "Extra Note"
      },
      "transcribedText": "Notes not matching questions",
      "aiNote": "Student extra rough work"
    }
  ],
  "summary": {
    "totalMarks": 38,
    "maxMarks": 45,
    "percentage": 84,
    "answeredCount": 13,
    "unansweredCount": 1,
    "totalQuestions": 14,
    "overallFeedback": "Summary of student performance...",
    "strengths": ["Strengths list"],
    "weaknesses": ["Weaknesses list"],
    "teacherRecommendation": "Pedagogical next steps"
  }
}`;

    // Format parts for multimodal prompt
    const parts: Array<string | { inlineData: { mimeType: string; data: string } }> = [prompt];

    // Add question paper images
    questionPaperImages.forEach((img: string) => {
      const { mimeType, data } = extractMimeAndBase64(img);
      parts.push({
        inlineData: {
          mimeType,
          data,
        },
      });
    });

    // Add answer sheet images
    answerSheetImages.forEach((img: string) => {
      const { mimeType, data } = extractMimeAndBase64(img);
      parts.push({
        inlineData: {
          mimeType,
          data,
        },
      });
    });

    let rawText = "";
    let lastError: unknown = null;

    // Latest supported Gemini models from Google AI Studio
    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
    ];

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
          },
        });
        const result = await model.generateContent(parts);
        rawText = result.response.text();
        if (rawText) {
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} encountered an issue, trying next candidate:`, err instanceof Error ? err.message : err);
      }
    }

    if (!rawText) {
      throw lastError || new Error("All Gemini model candidates failed to generate content.");
    }

    // Clean JSON markdown wrapper if present
    const cleanedJsonText = rawText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "");

    const parsedData = JSON.parse(cleanedJsonText);

    // Build structured assessment result
    const rawQuestions = Array.isArray(parsedData.questions) ? parsedData.questions : [];
    const questions: QuestionEntry[] = rawQuestions.map((q: Partial<QuestionEntry>, idx: number) => {
      const qNum = String(q.questionNumber || idx + 1);
      const subPart = q.subPart || undefined;
      const fullLabel = q.fullLabel || (subPart ? `${qNum} ${subPart}.` : qNum);
      const qId = q.id || `q-${qNum}${subPart ? `-${subPart}` : ""}`;

      return {
        id: qId,
        questionNumber: qNum,
        subPart,
        fullLabel,
        printedOrder: typeof q.printedOrder === "number" ? q.printedOrder : idx + 1,
        questionText: q.questionText || `Question ${fullLabel}`,
        maxMarks: Number(q.maxMarks) || 2,
        awardedMarks: typeof q.awardedMarks === "number" ? q.awardedMarks : 0,
        status: q.status || (q.awardedMarks === 0 ? "UNANSWERED" : "ANSWERED"),
        evaluation: q.evaluation || (q.awardedMarks === 0 ? "NOT_ATTEMPTED" : "CORRECT"),
        aiFeedback: q.aiFeedback || "Evaluated by AI grading engine.",
        keyConcepts: Array.isArray(q.keyConcepts) ? q.keyConcepts : [],
        isOutOfOrder: Boolean(q.isOutOfOrder),
        actualAnswerPage: q.actualAnswerPage,
        matchedAnswer: q.matchedAnswer
          ? {
              answerText: q.matchedAnswer.answerText || "",
              pageNumbers: Array.isArray(q.matchedAnswer.pageNumbers)
                ? q.matchedAnswer.pageNumbers
                : [1],
              isMultiPage: Boolean(q.matchedAnswer.isMultiPage),
              confidenceScore: typeof q.matchedAnswer.confidenceScore === "number"
                ? q.matchedAnswer.confidenceScore
                : 0.9,
              detectedHeader: q.matchedAnswer.detectedHeader,
              boundingBoxes: Array.isArray(q.matchedAnswer.boundingBoxes)
                ? q.matchedAnswer.boundingBoxes.map((b) => ({
                    pageNumber: Number(b.pageNumber) || 1,
                    ymin: Number(b.ymin) || 0,
                    xmin: Number(b.xmin) || 0,
                    ymax: Number(b.ymax) || 0,
                    xmax: Number(b.xmax) || 0,
                    label: b.label || `Q${fullLabel}`,
                  }))
                : [],
            }
          : undefined,
      };
    });

    const outOfOrderCount = questions.filter((q) => q.isOutOfOrder).length;
    const answeredCount = questions.filter((q) => q.status === "ANSWERED").length;
    const unansweredCount = questions.filter((q) => q.status === "UNANSWERED").length;

    const totalMarks = typeof parsedData.summary?.totalMarks === "number"
      ? parsedData.summary.totalMarks
      : questions.reduce((sum, q) => sum + q.awardedMarks, 0);

    const maxMarks = typeof parsedData.summary?.maxMarks === "number"
      ? parsedData.summary.maxMarks
      : questions.reduce((sum, q) => sum + q.maxMarks, 0);

    const percentage = maxMarks > 0 ? Math.round((totalMarks / maxMarks) * 100) : 0;

    const assessmentResult: AssessmentResult = {
      assessmentId: `asm-${Date.now()}`,
      title: parsedData.title || "Assessment Extraction",
      subject: parsedData.subject || "General Subject",
      gradeLevel: parsedData.gradeLevel || "Grade 10",
      studentName: parsedData.studentName || "Student Answer Sheet",
      totalPages: answerSheetImages.length || 1,
      pageImages: answerSheetImages.map((img: string, idx: number) => ({
        pageNumber: idx + 1,
        imageUrl: img,
        width: 800,
        height: 1100,
      })),
      questions,
      unmatchedAnswers: Array.isArray(parsedData.unmatchedAnswers) ? parsedData.unmatchedAnswers : [],
      summary: {
        totalMarks,
        maxMarks,
        percentage,
        answeredCount: parsedData.summary?.answeredCount ?? answeredCount,
        unansweredCount: parsedData.summary?.unansweredCount ?? unansweredCount,
        outOfOrderCount: parsedData.summary?.outOfOrderCount ?? outOfOrderCount,
        totalQuestions: parsedData.summary?.totalQuestions ?? questions.length,
        overallFeedback: parsedData.summary?.overallFeedback || "Assessment processed successfully.",
        strengths: Array.isArray(parsedData.summary?.strengths) ? parsedData.summary.strengths : [],
        weaknesses: Array.isArray(parsedData.summary?.weaknesses) ? parsedData.summary.weaknesses : [],
        teacherRecommendation: parsedData.summary?.teacherRecommendation || "Review individual questions above.",
      },
    };

    return NextResponse.json({ success: true, data: assessmentResult });
  } catch (error: unknown) {
    console.error("AI assessment processing error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process assessment with AI.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        code: "PROCESSING_FAILED",
      },
      { status: 500 }
    );
  }
}
