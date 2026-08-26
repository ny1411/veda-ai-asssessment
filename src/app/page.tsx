"use client";

import React, { useState, useEffect } from "react";
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

  // Modals state
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [isTeacherToolkitOpen, setIsTeacherToolkitOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");

  // Loading animation state
  const [loadingStage, setLoadingStage] = useState(1);
  const [loadingPercent, setLoadingPercent] = useState(15);
  const [stageTitle, setStageTitle] = useState("Ingesting document pages...");

  // Load API key from local storage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem("veda_gemini_api_key");
      if (savedKey) setApiKey(savedKey);
    } catch {
      // ignore
    }
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    try {
      localStorage.setItem("veda_gemini_api_key", newKey);
    } catch {
      // ignore
    }
  };

  // Load preloaded Class 10 Biology Sample (matching Figma)
  const handleLoadSample = () => {
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

  // Start Mapping Trigger with realistic progress stages
  const handleStartMapping = async () => {
    setScreenState("loading");
    setSidebarCollapsed(true); // Collapse sidebar in loading state matching Figma

    // If no assessment loaded yet, load or process
    let currentAssessment = assessment;
    if (!currentAssessment) {
      currentAssessment = getMockAssessmentResult();
      setAssessment(currentAssessment);
    }

    // Realistic multi-stage extraction animation
    setLoadingStage(1);
    setLoadingPercent(20);
    setStageTitle("Document Ingestion & Multi-page Rendering...");

    await new Promise((r) => setTimeout(r, 650));
    setLoadingStage(2);
    setLoadingPercent(50);
    setStageTitle("Extracting Question Paper & Sub-parts (11a, 11b)...");

    await new Promise((r) => setTimeout(r, 750));
    setLoadingStage(3);
    setLoadingPercent(80);
    setStageTitle("OCR Transcribing Handwriting & Coordinate Bounding Boxes...");

    await new Promise((r) => setTimeout(r, 700));
    setLoadingStage(4);
    setLoadingPercent(100);
    setStageTitle("Synthesizing AI Marks & Pedagogical Feedback...");

    await new Promise((r) => setTimeout(r, 550));

    // Transition to Split Mapping View
    setScreenState("mapping");
    setActiveQuestionId("q-2");
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
          hasApiKey={Boolean(apiKey)}
          scoreSummary={screenState === "mapping" ? scoreSummary : undefined}
        />

        {/* Screen Switcher */}
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {screenState === "upload" && (
            <UploadScreen
              questionPaper={questionPaper}
              answerSheet={answerSheet}
              onQuestionPaperSelected={(file, info) => {
                if (file) {
                  setQuestionPaper({
                    file,
                    name: info?.name || file.name,
                    sizeFormatted: info?.sizeFormatted || "2.1 MB",
                    pageCount: info?.pageCount || 2,
                  });
                } else {
                  setQuestionPaper(null);
                }
              }}
              onAnswerSheetSelected={(file, info) => {
                if (file) {
                  setAnswerSheet({
                    file,
                    name: info?.name || file.name,
                    sizeFormatted: info?.sizeFormatted || "8.0 MB",
                    pageCount: info?.pageCount || 4,
                  });
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
    </div>
  );
}
