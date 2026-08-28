import React, { useRef } from "react";
import { AnswerSheetPage, BoundingBox } from "@/types/assessment";
import { BoundingBoxOverlay } from "./BoundingBoxOverlay";

interface DocumentCanvasProps {
  page: AnswerSheetPage;
  zoomLevel: number;
  containerWidth?: number;
  activeQuestionId: string | null;
  boxes: Array<{
    questionId: string;
    label: string;
    box: BoundingBox;
    isUnmatched?: boolean;
  }>;
  onSelectQuestion: (questionId: string) => void;
}

/**
 * High-resolution document page renderer that dynamically fits the container width at 100% scale (default)
 * without overflowing, allowing natural aspect-ratio height scaling and interactive coordinate bounding boxes.
 */
export function DocumentCanvas({
  page,
  zoomLevel,
  containerWidth,
  activeQuestionId,
  boxes,
  onSelectQuestion,
}: DocumentCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute dynamic width: at 100% zoom, width matches exactly the allocated container width
  const baseWidth = containerWidth && containerWidth > 0 ? containerWidth : undefined;
  const targetWidth = baseWidth
    ? Math.round(baseWidth * (zoomLevel / 100))
    : undefined;

  return (
    <div
      ref={containerRef}
      id={`page-card-${page.pageNumber}`}
      style={{
        width: targetWidth ? `${targetWidth}px` : zoomLevel === 100 ? "100%" : `${zoomLevel}%`,
        maxWidth: zoomLevel <= 100 ? "100%" : "none",
      }}
      className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300 transition-[width,transform] duration-150 select-none flex-shrink-0"
    >
      {/* Primary Page Image: Fits container width at 100% scale, height scales naturally according to aspect ratio */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={page.imageUrl}
        alt={`Answer Sheet Page ${page.pageNumber}`}
        className="w-full h-auto block select-none pointer-events-none"
        draggable={false}
        loading="eager"
      />

      {/* Interactive Bounding Box Overlay Layer */}
      <BoundingBoxOverlay
        pageNumber={page.pageNumber}
        activeQuestionId={activeQuestionId}
        boxes={boxes}
        onSelectQuestion={onSelectQuestion}
        pageWidth={page.width}
        pageHeight={page.height}
      />

      {/* Subtle Page Badge at Top-Right Corner */}
      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-gray-900/70 backdrop-blur-xs text-white text-[10px] font-bold font-mono shadow-sm z-20 pointer-events-none">
        Page {page.pageNumber}
      </div>
    </div>
  );
}
