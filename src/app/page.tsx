"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { UploadScreen } from "@/components/upload/UploadScreen";
import { LoadingScreen } from "@/components/processing/LoadingScreen";
import { MappingView } from "@/components/mapping/MappingView";
import { MobileMappingView } from "@/components/mapping/MobileMappingView";
import { GradingSummaryModal } from "@/components/grading/GradingSummaryModal";
import { ApiKeyModal } from "@/components/settings/ApiKeyModal";
import { TeacherToolkitModal } from "@/components/toolkit/TeacherToolkitModal";
import {
  AppScreenState,
  AssessmentResult,
  UploadedFileInfo,
} from "@/types/assessment";
import { getMockAssessmentResult } from "@/lib/mock-data";
import { processUploadedFileToImages } from "@/lib/file-converter";

export default function Home() {
  const [screenState, setScreenState] = useState<AppScreenState>("upload");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [questionPaper, setQuestionPaper] = useState<UploadedFileInfo | null>(null);
  const [answerSheet, setAnswerSheet] = useState<UploadedFileInfo | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>("q-2");
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [isTeacherToolkitOpen, setIsTeacherToolkitOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("veda_gemini_api_key") || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  // Loading animation state
  const [loadingStage, setLoadingStage] = useState(1);
  const [loadingPercent, setLoadingPercent] = useState(15);
  const [stageTitle, setStageTitle] = useState("Ingesting document pages...");

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    try {
      localStorage.setItem("veda_gemini_api_key", newKey);
    } catch {
      // ignore
    }
    if (newKey) {
      setErrorMessage(null);
    }
  };

  // Load preloaded Class 10 Biology Sample (matching Figma benchmark)
  const handleLoadSample = () => {
    setIsDemoMode(true);
    setErrorMessage(null);
    const mock = getMockAssessmentResult();
    setQuestionPaper({
      file: null,
      name: "Class_10_biology_unit_test.pdf",
      sizeFormatted: "2.4 MB",
      pageCount: 2,
    });
    setAnswerSheet({
      file: null,
      name: "student_1_answer_sheet.pdf",
      sizeFormatted: "8.1 MB",
      pageCount: 4,
    });
    setAssessment(mock);
    setActiveQuestionId("q-2");
  };

  // Start Mapping Trigger with realistic progress stages and live AI pipeline
  const handleStartMapping = async () => {
    setErrorMessage(null);

    // Explicit Demo Flow
    if (isDemoMode) {
      setScreenState("loading");
      setSidebarCollapsed(true);

      setLoadingStage(1);
      setLoadingPercent(20);
      setStageTitle("Document Ingestion & Multi-page Rendering...");
      await new Promise((r) => setTimeout(r, 500));

      setLoadingStage(2);
      setLoadingPercent(50);
      setStageTitle("Extracting Question Paper & Sub-parts (11a, 11b)...");
      await new Promise((r) => setTimeout(r, 600));

      setLoadingStage(3);
      setLoadingPercent(80);
      setStageTitle("OCR Transcribing Handwriting & Coordinate Bounding Boxes...");
      await new Promise((r) => setTimeout(r, 500));

      setLoadingStage(4);
      setLoadingPercent(100);
      setStageTitle("Synthesizing AI Marks & Pedagogical Feedback...");
      await new Promise((r) => setTimeout(r, 400));

      const mock = getMockAssessmentResult();
      setAssessment(mock);
      setActiveQuestionId("q-2");
      setScreenState("mapping");
      return;
    }

    // Live AI Processing for Custom Uploaded Files
    if (!questionPaper?.file || !answerSheet?.file) {
      setErrorMessage("Please upload both a Question Paper and an Answer Sheet to proceed.");
      return;
    }

    // Clear stale assessment state before new run
    setAssessment(null);
    setScreenState("loading");
    setSidebarCollapsed(true);

    try {
      // 1. Stage 1: Document Ingestion & Page Rendering
      setLoadingStage(1);
      setLoadingPercent(20);
      setStageTitle("Document Ingestion & Multi-page Rendering...");

      let qpImages: string[] = questionPaper.dataBase64List || [];
      let asImages: string[] = answerSheet.dataBase64List || [];

      if (qpImages.length === 0 && questionPaper.file) {
        const res = await processUploadedFileToImages(questionPaper.file);
        qpImages = res.pageImages;
      }
      if (asImages.length === 0 && answerSheet.file) {
        const res = await processUploadedFileToImages(answerSheet.file);
        asImages = res.pageImages;
      }

      if (qpImages.length === 0 || asImages.length === 0) {
        throw new Error("Could not extract pages from the uploaded documents. Please check file format.");
      }

      // Initiate backend AI processing
      const apiCallPromise = fetch("/api/process-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionPaperImages: qpImages,
          answerSheetImages: asImages,
          apiKey: apiKey || undefined,
          isDemo: false,
        }),
      });

      await new Promise((r) => setTimeout(r, 600));

      // 2. Stage 2: Question Paper Parsing
      setLoadingStage(2);
      setLoadingPercent(50);
      setStageTitle("Extracting Question Paper & Sub-parts (11a, 11b)...");

      await new Promise((r) => setTimeout(r, 700));

      // 3. Stage 3: OCR Transcription & Coordinates
      setLoadingStage(3);
      setLoadingPercent(80);
      setStageTitle("OCR Transcribing Handwriting & Coordinate Bounding Boxes...");

      // Wait for AI backend response
      const res = await apiCallPromise;
      const apiResult = await res.json().catch(() => null);

      if (!res.ok || !apiResult?.success || !apiResult?.data) {
        const errorText =
          apiResult?.error ||
          (apiResult?.code === "MISSING_API_KEY"
            ? "AI processing is not configured. Please add your Gemini API key."
            : "Failed to process assessment with AI.");
        throw new Error(errorText);
      }

      // 4. Stage 4: AI Marks & Synthesis
      setLoadingStage(4);
      setLoadingPercent(100);
      setStageTitle("Synthesizing AI Marks & Pedagogical Feedback...");
      await new Promise((r) => setTimeout(r, 500));

      const finalAssessment: AssessmentResult = apiResult.data;
      setAssessment(finalAssessment);

      // Select first extracted question by default
      const firstQId = finalAssessment.questions?.[0]?.id || "q-1";
      setActiveQuestionId(firstQId);

      // Transition to Mapping View
      setScreenState("mapping");
    } catch (error) {
      console.error("Mapping execution error:", error);
      const msg =
        error instanceof Error
          ? error.message
          : "Failed to process assessment. Please verify your Gemini API key.";
      setErrorMessage(msg);
      setAssessment(null);
      setScreenState("upload");
      setSidebarCollapsed(false);
    }
  };

  const handleBackToUpload = () => {
    setScreenState("upload");
    setSidebarCollapsed(false);
  };

  const scoreSummary = assessment
    ? {
        total: assessment.summary.totalMarks,
        max: assessment.summary.maxMarks,
        percentage: assessment.summary.percentage,
      }
    : undefined;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA]">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          activeItem="Exams"
          onOpenTeacherToolkit={() => setIsTeacherToolkitOpen(true)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Header */}
        <Header
          showBack={screenState !== "upload"}
          onBack={handleBackToUpload}
          title={
            screenState === "mapping" && assessment
              ? `${assessment.title} — ${assessment.studentName}`
              : "Exams"
          }
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onOpenGradingModal={() => setIsGradingModalOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          hasApiKey={Boolean(apiKey)}
          scoreSummary={screenState === "mapping" ? scoreSummary : undefined}
        />

        {/* Screen Switcher */}
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {screenState === "upload" && (
            <UploadScreen
              questionPaper={questionPaper}
              answerSheet={answerSheet}
              errorMessage={errorMessage}
              onClearError={() => setErrorMessage(null)}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
              onQuestionPaperSelected={(file, info) => {
                setIsDemoMode(false);
                setErrorMessage(null);
                if (file) {
                  setQuestionPaper((prev) => ({
                    file,
                    name: info?.name || file.name,
                    sizeFormatted: info?.sizeFormatted || prev?.sizeFormatted || "2.1 MB",
                    pageCount: info?.pageCount || prev?.pageCount || 2,
                    dataBase64List: info?.dataBase64List || prev?.dataBase64List,
                  }));
                } else {
                  setQuestionPaper(null);
                }
              }}
              onAnswerSheetSelected={(file, info) => {
                setIsDemoMode(false);
                setErrorMessage(null);
                if (file) {
                  setAnswerSheet((prev) => ({
                    file,
                    name: info?.name || file.name,
                    sizeFormatted: info?.sizeFormatted || prev?.sizeFormatted || "8.0 MB",
                    pageCount: info?.pageCount || prev?.pageCount || 4,
                    dataBase64List: info?.dataBase64List || prev?.dataBase64List,
                  }));
                } else {
                  setAnswerSheet(null);
                }
              }}
              onStartMapping={handleStartMapping}
              onLoadSample={handleLoadSample}
            />
          )}

          {screenState === "loading" && (
            <LoadingScreen
              currentStage={loadingStage}
              progressPercent={loadingPercent}
              stageTitle={stageTitle}
            />
          )}

          {screenState === "mapping" && assessment && (
            <>
              {/* Desktop Split View */}
              <div className="hidden md:flex flex-1 h-full overflow-hidden">
                <MappingView
                  assessment={assessment}
                  activeQuestionId={activeQuestionId}
                  onSelectQuestion={(id) => setActiveQuestionId(id)}
                />
              </div>

              {/* Mobile View with Segmented Toggle */}
              <div className="flex md:hidden flex-1 h-full overflow-hidden">
                <MobileMappingView
                  assessment={assessment}
                  activeQuestionId={activeQuestionId}
                  onSelectQuestion={(id) => setActiveQuestionId(id)}
                />
              </div>
            </>
          )}
        </main>
      </div>

      {/* Grading Insights Modal */}
      {assessment && (
        <GradingSummaryModal
          isOpen={isGradingModalOpen}
          onClose={() => setIsGradingModalOpen(false)}
          summary={assessment.summary}
          studentName={assessment.studentName}
          examTitle={assessment.title}
          gradeLevel={assessment.gradeLevel}
          questions={assessment.questions}
        />
      )}

      {/* Gemini API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* AI Teacher's Toolkit Modal */}
      <TeacherToolkitModal
        isOpen={isTeacherToolkitOpen}
        onClose={() => setIsTeacherToolkitOpen(false)}
      />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-[280px] h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200 z-10">
            <Sidebar
              collapsed={false}
              activeItem="Exams"
              onOpenTeacherToolkit={() => {
                setIsTeacherToolkitOpen(true);
                setIsMobileMenuOpen(false);
              }}
              onToggleCollapse={() => setIsMobileMenuOpen(false)}
            />
          </div>
          <div
            className="flex-1 h-full cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
