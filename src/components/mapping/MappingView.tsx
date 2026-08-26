import React, { useState, useEffect } from "react";
import { AssessmentResult } from "@/types/assessment";
import { QuestionsList } from "./QuestionsList";
import { AnswerSheetViewer } from "@/components/viewer/AnswerSheetViewer";

interface MappingViewProps {
  assessment: AssessmentResult;
  activeQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
}

export function MappingView({
  assessment,
  activeQuestionId,
  onSelectQuestion,
}: MappingViewProps) {
  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(42);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Keyboard shortcut navigation (ArrowUp/Down, J/K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const allIds = assessment.questions.map((q) => q.id);
      const currentIndex = allIds.findIndex((id) => id === activeQuestionId);

      if (e.key === "ArrowDown" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        const nextIndex = currentIndex < allIds.length - 1 ? currentIndex + 1 : 0;
        onSelectQuestion(allIds[nextIndex]);
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : allIds.length - 1;
        onSelectQuestion(allIds[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [assessment.questions, activeQuestionId, onSelectQuestion]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    const newPercent = ((e.clientX - container.left) / container.width) * 100;
    if (newPercent >= 25 && newPercent <= 65) {
      setLeftWidthPercent(newPercent);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="flex-1 flex h-[calc(100vh-4rem)] p-3 md:p-5 gap-3 md:gap-4 overflow-hidden select-none"
    >
      {/* Left Panel: Extracted Questions */}
      <div
        style={{ width: `${leftWidthPercent}%` }}
        className="h-full flex flex-col min-w-[320px] max-w-[65%]"
      >
        <QuestionsList
          questions={assessment.questions}
          unmatchedAnswers={assessment.unmatchedAnswers}
          activeQuestionId={activeQuestionId}
          onSelectQuestion={onSelectQuestion}
        />
      </div>

      {/* Resizer Divider Bar with Pill Handle matching Figma */}
      <div
        onMouseDown={handleMouseDown}
        className="hidden md:flex items-center justify-center w-3 cursor-col-resize hover:bg-orange-100/40 rounded-full transition-colors flex-shrink-0 relative group"
        title="Drag to resize panels"
      >
        <div className="w-1.5 h-12 rounded-full bg-gray-300 group-hover:bg-orange-500 transition-colors shadow-2xs" />
      </div>

      {/* Right Panel: Answer Sheet Viewer */}
      <div className="flex-1 h-full min-w-[380px] overflow-hidden flex flex-col">
        <AnswerSheetViewer
          pages={assessment.pageImages}
          questions={assessment.questions}
          unmatchedAnswers={assessment.unmatchedAnswers}
          activeQuestionId={activeQuestionId}
          onSelectQuestion={onSelectQuestion}
        />
      </div>
    </div>
  );
}
