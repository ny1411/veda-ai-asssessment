import React from "react";
import { motion } from "framer-motion";
import { SparkleAnimation } from "@/components/icons/SparkleAnimation";
import { CheckCircle2, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  currentStage?: number;
  stageTitle?: string;
  stageDescription?: string;
  progressPercent?: number;
}

export function LoadingScreen({
  currentStage = 2,
  stageTitle = "Extracting questions & handwritten answers...",
  stageDescription = "Processing document layout, diagrams, and handwriting coordinates",
  progressPercent = 45,
}: LoadingScreenProps) {
  const stages = [
    { id: 1, label: "Document Ingestion & Multi-page Rendering" },
    { id: 2, label: "Question Paper Parsing & Sub-part Extraction" },
    { id: 3, label: "Handwritten Answer OCR & Coordinate Mapping" },
    { id: 4, label: "AI Evaluation, Grading & Feedback Synthesis" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 select-none max-w-xl mx-auto w-full min-h-[500px]">
      {/* Sparkle Star Animation */}
      <div className="mb-4">
        <SparkleAnimation className="w-36 h-36 md:w-44 md:h-44" />
      </div>

      {/* Main Text Matching Figma */}
      <div className="text-center space-y-1 mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Extracting...
        </h2>
        <p className="text-sm md:text-base text-gray-500 font-medium">
          This may take a while
        </p>
      </div>

      {/* Polish: Interactive Stage Tracker */}
      <div className="w-full bg-white border border-gray-100 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
            initial={{ width: "10%" }}
            animate={{ width: `${Math.max(10, Math.min(100, progressPercent))}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Current status detail */}
        <div className="flex flex-col space-y-0.5">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="font-semibold text-gray-900">{stageTitle}</span>
            <span className="font-mono font-bold text-orange-600">{progressPercent}%</span>
          </div>
          {stageDescription && (
            <span className="text-[11px] text-gray-400">{stageDescription}</span>
          )}
        </div>

        {/* Step Items */}
        <div className="space-y-2 pt-1">
          {stages.map((st) => {
            const isCompleted = st.id < currentStage;
            const isCurrent = st.id === currentStage;
            return (
              <div
                key={st.id}
                className={`flex items-center space-x-2.5 text-xs transition-colors ${
                  isCurrent
                    ? "text-orange-950 font-bold"
                    : isCompleted
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-orange-500 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" />
                )}
                <span className="truncate">{st.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
