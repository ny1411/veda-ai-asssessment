import React from "react";
import { BoundingBox } from "@/types/assessment";
import { boundingBoxToPercentages } from "@/lib/utils";

interface BoundingBoxOverlayProps {
  pageNumber: number;
  activeQuestionId: string | null;
  boxes: Array<{
    questionId: string;
    label: string;
    box: BoundingBox;
    isUnmatched?: boolean;
  }>;
  onSelectQuestion: (questionId: string) => void;
}

export function BoundingBoxOverlay({
  pageNumber,
  activeQuestionId,
  boxes,
  onSelectQuestion,
}: BoundingBoxOverlayProps) {
  const pageBoxes = boxes.filter((b) => b.box.pageNumber === pageNumber);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {pageBoxes.map((item, index) => {
        const isActive = item.questionId === activeQuestionId;
        const isUnmatched = item.isUnmatched;
        const styles = boundingBoxToPercentages(item.box);

        return (
          <div
            key={`${item.questionId}-${index}`}
            id={`box-${item.questionId}-p${pageNumber}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectQuestion(item.questionId);
            }}
            style={{
              top: styles.top,
              left: styles.left,
              width: styles.width,
              height: styles.height,
            }}
            className={`absolute pointer-events-auto cursor-pointer rounded-xl transition-all duration-200 ${
              isUnmatched
                ? "border-2 border-purple-500 bg-purple-500/10 hover:bg-purple-500/20"
                : isActive
                ? "border-[2.5px] border-[#22C55E] bg-[#22C55E]/15 bounding-box-active ring-4 ring-emerald-400/25"
                : "border border-gray-400/50 hover:border-[#22C55E] hover:bg-[#22C55E]/10"
            }`}
          >
            {/* Top-Left Floating Badge Pill Matching Figma */}
            <div
              className={`absolute -top-3.5 -left-1 px-2.5 py-0.5 rounded-lg text-xs font-black shadow-md flex items-center space-x-1 select-none transition-transform ${
                isUnmatched
                  ? "bg-purple-600 text-white"
                  : isActive
                  ? "bg-[#22C55E] text-white scale-105"
                  : "bg-gray-700 text-white opacity-80 group-hover:opacity-100"
              }`}
            >
              <span>{item.label}</span>
            </div>

            {/* Pulsing Corner dots for active box */}
            {isActive && (
              <>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
                <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
