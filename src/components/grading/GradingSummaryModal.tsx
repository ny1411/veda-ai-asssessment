import React from "react";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  Printer,
  X,
  Sparkles,
  BarChart2,
  FileCheck,
  BookOpen,
} from "lucide-react";
import { AssessmentSummary, QuestionEntry } from "@/types/assessment";
import confetti from "canvas-confetti";

interface GradingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: AssessmentSummary;
  studentName: string;
  examTitle: string;
  gradeLevel: string;
  questions: QuestionEntry[];
}

export function GradingSummaryModal({
  isOpen,
  onClose,
  summary,
  studentName,
  examTitle,
  gradeLevel,
  questions,
}: GradingSummaryModalProps) {
  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore in environments without canvas
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify(
        {
          studentName,
          examTitle,
          gradeLevel,
          summary,
          questions,
          exportedAt: new Date().toISOString(),
        },
        null,
        2
      )
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${studentName.replace(/\s+/g, "_")}_Grading_Report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50/80 via-amber-50/40 to-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-600 shadow-2xs">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">Grading &amp; AI Assessment Insights</h2>
              <p className="text-xs text-gray-500 font-medium">
                {studentName} • {examTitle} ({gradeLevel})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Score Banner */}
          <div className="bg-gradient-to-br from-[#1E242D] to-[#2B3441] text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                Overall Performance
              </span>
              <div className="flex items-baseline space-x-3 justify-center sm:justify-start">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  {summary.totalMarks}
                </span>
                <span className="text-xl text-gray-400 font-bold">/ {summary.maxMarks} Marks</span>
              </div>
              <p className="text-xs text-gray-300">
                Grade: <strong className="text-emerald-400">{summary.percentage >= 80 ? "A (Distinction)" : "B (Good)"}</strong> • Percentage:{" "}
                <strong className="text-orange-300">{summary.percentage}%</strong>
              </p>
            </div>

            {/* Circular Progress Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={triggerConfetti} title="Click for celebration!">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#22C55E]"
                  strokeDasharray={`${summary.percentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-black text-white">{summary.percentage}%</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
              <span className="text-[11px] text-gray-500 font-medium">Total Questions</span>
              <p className="text-lg font-extrabold text-gray-900 mt-0.5">{summary.totalQuestions}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-center">
              <span className="text-[11px] text-emerald-700 font-medium">Answered</span>
              <p className="text-lg font-extrabold text-emerald-700 mt-0.5">{summary.answeredCount}</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3 text-center">
              <span className="text-[11px] text-red-600 font-medium">Unanswered</span>
              <p className="text-lg font-extrabold text-red-600 mt-0.5">{summary.unansweredCount}</p>
            </div>
          </div>

          {/* AI Comprehensive Evaluation */}
          <div className="bg-orange-50/60 border border-orange-100 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-orange-950">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>AI Pedagogical Summary</span>
            </div>
            <p className="text-xs text-orange-900 leading-relaxed">
              {summary.overallFeedback}
            </p>
          </div>

          {/* Strengths & Weaknesses Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demonstrated Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950/90 pl-1">
                {summary.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Growth */}
            <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-900">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Areas for Growth</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950/90 pl-1">
                {summary.weaknesses.map((wk, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Teacher Recommendation Box */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Recommended Follow-up Action</span>
            </div>
            <p className="text-xs text-blue-950 leading-relaxed">
              {summary.teacherRecommendation}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between flex-shrink-0">
          <div className="text-[11px] text-gray-500 font-mono">
            VedaAI Assessment ID: asm-bio-10
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center space-x-1.5 shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-4 py-2 text-xs font-bold text-white bg-[#1E242D] hover:bg-[#2B3441] rounded-xl flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-orange-400" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
