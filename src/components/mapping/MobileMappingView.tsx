import React, { useState } from "react";
import { AssessmentResult } from "@/types/assessment";
import { QuestionsList } from "./QuestionsList";
import { AnswerSheetViewer } from "@/components/viewer/AnswerSheetViewer";
import { Eye, ListOrdered, ArrowRight } from "lucide-react";

interface MobileMappingViewProps {
  assessment: AssessmentResult;
  activeQuestionId: string | null;
  onSelectQuestion: (id: string) => void;
}

export function MobileMappingView({
  assessment,
  activeQuestionId,
  onSelectQuestion,
}: MobileMappingViewProps) {
  const [activeTab, setActiveTab] = useState<"QUESTIONS" | "ANSWER_SHEET">("QUESTIONS");

  const activeQuestion = assessment.questions.find((q) => q.id === activeQuestionId);

  const handleSelectFromList = (id: string) => {
    onSelectQuestion(id);
    // When a question is selected on mobile, provide quick option to view it on answer sheet
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] p-3 overflow-hidden">
      {/* Top Segmented Control matching Figma Mobile */}
      <div className="w-full bg-gray-100 p-1 rounded-2xl flex items-center justify-between mb-3 shadow-inner flex-shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("QUESTIONS")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            activeTab === "QUESTIONS"
              ? "bg-[#2B323D] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>Questions</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ANSWER_SHEET")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            activeTab === "ANSWER_SHEET"
              ? "bg-[#2B323D] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Answer Sheet</span>
        </button>
      </div>

      {/* Content Area Based on Active Tab */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === "QUESTIONS" ? (
          <div className="h-full flex flex-col">
            <QuestionsList
              questions={assessment.questions}
              unmatchedAnswers={assessment.unmatchedAnswers}
              activeQuestionId={activeQuestionId}
              onSelectQuestion={handleSelectFromList}
            />

            {/* Quick Floating Jump Bar if a Question is Selected */}
            {activeQuestion && (
              <div className="absolute bottom-3 left-2 right-2 p-3 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center justify-between z-30 animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center text-xs font-bold">
                    {activeQuestion.questionNumber}
                  </span>
                  <span className="text-xs font-medium truncate">
                    {activeQuestion.questionText}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("ANSWER_SHEET")}
                  className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center space-x-1 flex-shrink-0 ml-2"
                >
                  <span>View Answer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col relative">
            <AnswerSheetViewer
              pages={assessment.pageImages}
              questions={assessment.questions}
              unmatchedAnswers={assessment.unmatchedAnswers}
              activeQuestionId={activeQuestionId}
              onSelectQuestion={onSelectQuestion}
            />

            {/* Quick Floating Jump Bar back to Question on Mobile */}
            {activeQuestion && (
              <div className="absolute bottom-3 left-2 right-2 p-3 bg-gray-900/95 backdrop-blur-md text-white rounded-2xl shadow-xl flex items-center justify-between z-30 border border-gray-700 animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {activeQuestion.questionNumber}
                  </span>
                  <span className="text-xs font-medium text-gray-200 truncate">
                    Q{activeQuestion.fullLabel}: {activeQuestion.questionText}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("QUESTIONS")}
                  className="px-3 py-1.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold flex items-center space-x-1 flex-shrink-0 ml-2"
                >
                  <span>Questions</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
