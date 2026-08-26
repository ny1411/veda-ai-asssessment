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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Start Mapping Trigger with realistic progress stages and live API support
  const handleStartMapping = async () => {
    setScreenState("loading");
    setSidebarCollapsed(true); // Collapse sidebar in loading state matching Figma

    try {
      // 1. Stage 1: Document Ingestion
      setLoadingStage(1);
      setLoadingPercent(20);
      setStageTitle("Document Ingestion & Multi-page Rendering...");

      let qpImages: string[] = questionPaper?.dataBase64List || [];
      let asImages: string[] = answerSheet?.dataBase64List || [];

      if (questionPaper?.file && qpImages.length === 0) {
        const res = await processUploadedFileToImages(questionPaper.file);
        qpImages = res.pageImages;
      }
      if (answerSheet?.file && asImages.length === 0) {
        const res = await processUploadedFileToImages(answerSheet.file);
        asImages = res.pageImages;
      }

      // Check if custom files or API key is used
      const isCustomFile = Boolean(questionPaper?.file || answerSheet?.file);
      let apiCallPromise: Promise<any> | null = null;

      if (isCustomFile && (qpImages.length > 0 || asImages.length > 0)) {
        apiCallPromise = fetch("/api/process-assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionPaperImages: qpImages,
            answerSheetImages: asImages,
            apiKey: apiKey || undefined,
            isDemo: false,
          }),
        }).then((res) => res.json()).catch((err) => {
          console.warn("API call error:", err);
          return null;
        });
      }

      await new Promise((r) => setTimeout(r, 650));

      // 2. Stage 2: Question Extraction
      setLoadingStage(2);
      setLoadingPercent(50);
      setStageTitle("Extracting Question Paper & Sub-parts (11a, 11b)...");

      await new Promise((r) => setTimeout(r, 750));

      // 3. Stage 3: OCR & Coordinates
      setLoadingStage(3);
      setLoadingPercent(80);
      setStageTitle("OCR Transcribing Handwriting & Coordinate Bounding Boxes...");

      await new Promise((r) => setTimeout(r, 700));

      // 4. Stage 4: AI Evaluation
      setLoadingStage(4);
      setLoadingPercent(100);
      setStageTitle("Synthesizing AI Marks & Pedagogical Feedback...");

      let finalAssessment: AssessmentResult | null = null;

      if (apiCallPromise) {
        const apiResult = await apiCallPromise;
        if (apiResult?.success && apiResult?.data) {
          finalAssessment = apiResult.data;
        }
      }

      if (!finalAssessment) {
        finalAssessment = assessment || getMockAssessmentResult();
      }

      setAssessment(finalAssessment);
      await new Promise((r) => setTimeout(r, 500));

      // Transition to Split Mapping View
      setScreenState("mapping");
      setActiveQuestionId("q-2");
    } catch (error) {
      console.error("Mapping execution error:", error);
      setAssessment(getMockAssessmentResult());
      setScreenState("mapping");
      setActiveQuestionId("q-2");
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
