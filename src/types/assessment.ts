export interface BoundingBox {
  pageNumber: number; // 1-indexed page (e.g. 1, 2, 3, 4)
  ymin: number; // Normalized top coordinate (0 to 1000 or 0 to 100%)
  xmin: number; // Normalized left coordinate
  ymax: number; // Normalized bottom coordinate
  xmax: number; // Normalized right coordinate
  label?: string; // e.g. "Q1", "Q2", "11 a.", "11 b."
}

export type QuestionStatus = 'ANSWERED' | 'UNANSWERED' | 'OUT_OF_ORDER' | 'PARTIAL';
export type EvaluationStatus = 'CORRECT' | 'PARTIALLY_CORRECT' | 'INCORRECT' | 'NOT_ATTEMPTED';

export interface MatchedAnswer {
  answerText: string;
  pageNumbers: number[];
  boundingBoxes: BoundingBox[];
  isMultiPage: boolean;
  confidenceScore: number;
  detectedHeader?: string; // e.g. "Q1.", "Q2.", "Ans 6"
}

export interface QuestionEntry {
  id: string; // unique ID e.g. "q-1", "q-11-a"
  questionNumber: string; // e.g. "1", "2", "11"
  subPart?: string; // e.g. "a", "b", "i", "ii" or undefined
  fullLabel: string; // e.g. "1", "2", "11 a.", "11 b."
  printedOrder: number; // 1, 2, 3, ...
  questionText: string;
  maxMarks: number;
  awardedMarks: number;
  status: QuestionStatus;
  evaluation: EvaluationStatus;
  aiFeedback: string;
  isOutOfOrder?: boolean;
  actualAnswerPage?: number;
  keyConcepts?: string[];
  suggestedImprovement?: string;
  matchedAnswer?: MatchedAnswer;
}

export interface UnmatchedAnswer {
  id: string;
  pageNumber: number;
  boundingBox: BoundingBox;
  transcribedText: string;
  aiNote: string;
  detectedLabel?: string;
}

export interface AssessmentSummary {
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  answeredCount: number;
  unansweredCount: number;
  outOfOrderCount: number;
  totalQuestions: number;
  overallFeedback: string;
  strengths: string[];
  weaknesses: string[];
  teacherRecommendation: string;
}

export interface AnswerSheetPage {
  pageNumber: number;
  imageUrl: string;
  width: number;
  height: number;
  aspectRatio?: number;
}

export interface AssessmentResult {
  assessmentId: string;
  title: string;
  subject: string;
  gradeLevel: string;
  studentName: string;
  examDate?: string;
  totalPages: number;
  pageImages: AnswerSheetPage[];
  questionPaperImages?: string[];
  questions: QuestionEntry[];
  unmatchedAnswers: UnmatchedAnswer[];
  summary: AssessmentSummary;
}

export type AppScreenState = 'upload' | 'loading' | 'mapping';

export interface UploadedFileInfo {
  file: File | null;
  name: string;
  sizeFormatted: string;
  pageCount: number;
  previewUrl?: string;
  dataBase64List?: string[];
}

export interface ProcessingProgress {
  stage: number; // 1 to 4
  stageTitle: string;
  stageDescription: string;
  percent: number;
}
