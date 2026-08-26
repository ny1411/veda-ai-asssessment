import React, { useEffect, useRef, useState } from "react";
import {
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  AlertCircle,
  FileQuestion,
} from "lucide-react";
import { AnswerSheetPage, QuestionEntry, UnmatchedAnswer } from "@/types/assessment";
import { DocumentCanvas } from "./DocumentCanvas";

interface AnswerSheetViewerProps {
  pages: AnswerSheetPage[];
  questions: QuestionEntry[];
  unmatchedAnswers: UnmatchedAnswer[];
  activeQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
}

export function AnswerSheetViewer({
  pages,
  questions,
  unmatchedAnswers,
  activeQuestionId,
  onSelectQuestion,
}: AnswerSheetViewerProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Active question details
  const activeQuestion = questions.find((q) => q.id === activeQuestionId);
  const isUnanswered = activeQuestion?.status === "UNANSWERED";

  // Build flattened list of bounding boxes
  const allBoxes: Array<{
    questionId: string;
    label: string;
    box: {
      pageNumber: number;
      ymin: number;
      xmin: number;
      ymax: number;
      xmax: number;
    };
    isUnmatched?: boolean;
  }> = [];

  questions.forEach((q) => {
    if (q.matchedAnswer?.boundingBoxes) {
      q.matchedAnswer.boundingBoxes.forEach((box) => {
        allBoxes.push({
          questionId: q.id,
          label: box.label || `Q${q.fullLabel}`,
          box,
        });
      });
    }
  });

  unmatchedAnswers.forEach((u) => {
    allBoxes.push({
      questionId: u.id,
      label: u.detectedLabel || "Unmatched",
      box: u.boundingBox,
      isUnmatched: true,
    });
  });

  // Auto-scroll to bounding box when activeQuestionId changes
  useEffect(() => {
    if (!activeQuestion || !activeQuestion.matchedAnswer?.boundingBoxes?.length) {
      return;
    }

    const firstBox = activeQuestion.matchedAnswer.boundingBoxes[0];
    setCurrentPage(firstBox.pageNumber);

    // Give DOM time to render page and coordinates
    const timer = setTimeout(() => {
      const elementId = `box-${activeQuestion.id}-p${firstBox.pageNumber}`;
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        const pageEl = document.getElementById(`page-card-${firstBox.pageNumber}`);
        if (pageEl) {
          pageEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [activeQuestionId, activeQuestion]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(220, prev + 15));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(60, prev - 15));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const targetPage = currentPage - 1;
      setCurrentPage(targetPage);
      document
        .getElementById(`page-card-${targetPage}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      const targetPage = currentPage + 1;
      setCurrentPage(targetPage);
      document
        .getElementById(`page-card-${targetPage}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E242D] text-white rounded-3xl overflow-hidden shadow-lg border border-gray-800">
      {/* Top Header Bar Matching Figma */}
      <div className="h-14 px-4 md:px-6 bg-[#2B323D] border-b border-gray-700/50 flex items-center justify-between z-20 flex-shrink-0">
        {/* Title */}
        <span className="font-bold text-sm text-gray-100">Answer Sheet</span>

        {/* Center/Right Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Zoom Controls Pill */}
          <div className="flex items-center bg-[#1E242D] rounded-full px-2 py-1 text-xs font-semibold space-x-1 border border-gray-700 shadow-xs">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 60}
              className="p-1 text-gray-300 hover:text-white hover:bg-gray-700/60 rounded-full transition-colors disabled:opacity-40"
              title="Zoom out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-1.5 py-0.5 text-gray-200 hover:text-white text-xs font-mono"
              title="Reset Zoom to 100%"
            >
              {zoomLevel}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 220}
              className="p-1 text-gray-300 hover:text-white hover:bg-gray-700/60 rounded-full transition-colors disabled:opacity-40"
              title="Zoom in"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Page Navigator Pill */}
          <div className="flex items-center bg-[#1E242D] rounded-full px-2 py-1 text-xs font-semibold space-x-1.5 border border-gray-700 shadow-xs">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1 text-gray-300 hover:text-white hover:bg-gray-700/60 rounded-full transition-colors disabled:opacity-40"
              title="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-gray-200 text-xs px-1">
              Page {currentPage} of {pages.length}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= pages.length}
              className="p-1 text-gray-300 hover:text-white hover:bg-gray-700/60 rounded-full transition-colors disabled:opacity-40"
              title="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fit to Screen Button */}
          <button
            type="button"
            onClick={handleResetZoom}
            className="hidden sm:flex p-1.5 bg-[#1E242D] text-gray-300 hover:text-white rounded-full border border-gray-700 hover:bg-gray-700/60 transition-colors"
            title="Fit Width"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Unanswered Notice Banner if Active Question is Unanswered */}
      {isUnanswered && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-200 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Question {activeQuestion?.fullLabel} was left unanswered</strong> — no matching handwritten response found on the answer sheet.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-100 text-[11px] font-bold">
            0 Marks Awarded
          </span>
        </div>
      )}

      {/* Multi-page Navigation Indicator if Answer Spans Multiple Pages */}
      {activeQuestion?.matchedAnswer?.isMultiPage && (
        <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between text-xs text-emerald-200 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              <strong>Multi-page Answer:</strong> Question {activeQuestion.fullLabel} spans pages{" "}
              {activeQuestion.matchedAnswer.pageNumbers.join(" & ")}.
            </span>
          </div>
          <div className="flex space-x-1.5">
            {activeQuestion.matchedAnswer.pageNumbers.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setCurrentPage(p);
                  document
                    .getElementById(`page-card-${p}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  currentPage === p
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-950/60 text-emerald-300 hover:bg-emerald-800"
                }`}
              >
                Page {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scrollable Answer Sheet Document Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-auto p-4 md:p-8 flex flex-col items-center space-y-8 bg-[#12161C]"
      >
        {pages.map((page) => (
          <DocumentCanvas
            key={page.pageNumber}
            page={page}
            zoomLevel={zoomLevel}
            activeQuestionId={activeQuestionId}
            boxes={allBoxes}
            onSelectQuestion={onSelectQuestion}
          />
        ))}

        {/* End of Sheet Marker */}
        <div className="text-gray-500 text-xs py-4 flex items-center space-x-2">
          <FileQuestion className="w-4 h-4 text-gray-600" />
          <span>End of Answer Sheet Pages</span>
        </div>
      </div>
    </div>
  );
}
