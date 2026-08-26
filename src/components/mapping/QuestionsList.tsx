import React, { useState } from "react";
import { QuestionEntry, UnmatchedAnswer } from "@/types/assessment";
import { QuestionCard } from "./QuestionCard";
import { Sparkles, HelpCircle, AlertTriangle, Eye } from "lucide-react";

interface QuestionsListProps {
  questions: QuestionEntry[];
  unmatchedAnswers: UnmatchedAnswer[];
  activeQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
}

export function QuestionsList({
  questions,
  unmatchedAnswers,
  activeQuestionId,
  onSelectQuestion,
}: QuestionsListProps) {
  const [filter, setFilter] = useState<"ALL" | "ANSWERED" | "UNANSWERED">("ALL");
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({
    // By default, expand active question (e.g. Q2) matching Figma
    "q-2": true,
  });

  const handleToggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleExpandAll = () => {
    const areAllExpanded = questions.every((q) => expandedMap[q.id]);
    const nextState: Record<string, boolean> = {};
    questions.forEach((q) => {
      nextState[q.id] = !areAllExpanded;
    });
    setExpandedMap(nextState);
  };

  const filteredQuestions = questions.filter((q) => {
    if (filter === "ANSWERED") return q.status === "ANSWERED";
    if (filter === "UNANSWERED") return q.status === "UNANSWERED";
    return true;
  });

  const allExpanded = questions.every((q) => expandedMap[q.id]);

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Header Matching Figma */}
      <div className="flex items-center justify-between pb-3 pt-1 px-1 flex-shrink-0">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Extracted Questions{" "}
          <span className="text-xs text-gray-500 font-normal">(from question paper)</span>
        </h2>

        <button
          type="button"
          onClick={handleToggleExpandAll}
          className="px-3 py-1 rounded-full border border-gray-300 hover:border-gray-400 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center space-x-1.5 pb-3 px-1 flex-shrink-0 overflow-x-auto">
        <button
          type="button"
          onClick={() => setFilter("ALL")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            filter === "ALL"
              ? "bg-[#1E242D] text-white shadow-xs"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          All ({questions.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("ANSWERED")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            filter === "ANSWERED"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Answered ({questions.filter((q) => q.status === "ANSWERED").length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("UNANSWERED")}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            filter === "UNANSWERED"
              ? "bg-red-600 text-white shadow-xs"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Unanswered ({questions.filter((q) => q.status === "UNANSWERED").length})
        </button>
      </div>

      {/* Scrollable Questions List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 pb-8">
        {filteredQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            isActive={question.id === activeQuestionId}
            isExpanded={Boolean(expandedMap[question.id]) || question.id === activeQuestionId}
            onSelect={() => onSelectQuestion(question.id)}
            onToggleExpand={(e) => handleToggleExpand(question.id, e)}
          />
        ))}

        {/* Unmatched Answers Section if present (Edge Case Handling) */}
        {unmatchedAnswers && unmatchedAnswers.length > 0 && (
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-800 mb-2">
              <AlertTriangle className="w-4 h-4 text-purple-600" />
              <span>Unmatched Student Writing Detected ({unmatchedAnswers.length})</span>
            </div>

            {unmatchedAnswers.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectQuestion(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeQuestionId === item.id
                    ? "border-purple-500 bg-purple-50/80 ring-2 ring-purple-400/30"
                    : "border-purple-200 bg-purple-50/40 hover:bg-purple-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">
                    {item.detectedLabel || "Unmatched Note"} (Page {item.pageNumber})
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-800 text-[10px] font-bold">
                    No Question Match
                  </span>
                </div>
                <p className="text-xs text-purple-950/80 mt-1 italic font-serif">
                  &ldquo;{item.transcribedText}&rdquo;
                </p>
                <p className="text-[11px] text-purple-700 mt-1.5 font-medium">
                  Note: {item.aiNote}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
