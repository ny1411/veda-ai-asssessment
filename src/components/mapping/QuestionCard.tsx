import React from "react";
import { ChevronDown, ChevronUp, AlertCircle, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { QuestionEntry } from "@/types/assessment";
import { getScoreBadgeVariant } from "@/lib/utils";

interface QuestionCardProps {
  question: QuestionEntry;
  isActive: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: (e: React.MouseEvent) => void;
}

export function QuestionCard({
  question,
  isActive,
  isExpanded,
  onSelect,
  onToggleExpand,
}: QuestionCardProps) {
  const scoreVariant = getScoreBadgeVariant(question.awardedMarks, question.maxMarks);
  const isUnanswered = question.status === "UNANSWERED";
  const isMultiPage = question.matchedAnswer?.isMultiPage;

  return (
    <div
      id={`question-card-${question.id}`}
      onClick={onSelect}
      className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        isActive
          ? "border-[#FF5722] bg-white ring-2 ring-orange-500/20 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
      }`}
    >
      {/* Top Main Row */}
      <div className="p-4 flex items-start justify-between gap-3">
        {/* Left: Number Badge + Question Text */}
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* Badge */}
          {question.subPart ? (
            /* Sub-part badge e.g. 11 a. */
            <div className="flex items-center space-x-1.5 flex-shrink-0 pt-0.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[#FF5722] text-white shadow-sm"
                    : "bg-[#1E242D] text-white"
                }`}
              >
                {question.questionNumber}
              </div>
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded-md">
                {question.subPart}.
              </span>
            </div>
          ) : (
            /* Regular Question Badge e.g. 1, 2, 3 */
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 pt-0.5 transition-colors ${
                isActive
                  ? "bg-[#FF5722] text-white shadow-sm"
                  : "bg-[#1E242D] text-white"
              }`}
            >
              {question.questionNumber}
            </div>
          )}

          {/* Question Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 leading-snug">
              {question.questionText}
            </p>

            {/* Edge Case Tags (Multi-page / Out of order / Unanswered) */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {isUnanswered && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-red-600 text-[11px] font-semibold">
                  <AlertCircle className="w-3 h-3" />
                  <span>Unanswered</span>
                </span>
              )}

              {isMultiPage && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-semibold">
                  <Layers className="w-3 h-3" />
                  <span>Spans Pages {question.matchedAnswer?.pageNumbers.join(", ")}</span>
                </span>
              )}

              {question.isOutOfOrder && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Answered on Page {question.actualAnswerPage}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Score Pill & Chevron */}
        <div className="flex items-center space-x-2 flex-shrink-0 pt-0.5">
          {/* Score Badge */}
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-extrabold border ${scoreVariant.badgeBg}`}
          >
            {scoreVariant.pillText}
          </div>

          {/* Expand / Collapse Button */}
          <button
            type="button"
            onClick={onToggleExpand}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title={isExpanded ? "Collapse Feedback" : "Expand Feedback"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Accordion Body: AI Feedback Matching Figma */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-gray-50/70 space-y-2.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-800 pt-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>AI Feedback</span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
            {question.aiFeedback}
          </p>

          {/* Key concepts & metadata if present */}
          {question.keyConcepts && question.keyConcepts.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                Concepts:
              </span>
              {question.keyConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-medium"
                >
                  {concept}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
