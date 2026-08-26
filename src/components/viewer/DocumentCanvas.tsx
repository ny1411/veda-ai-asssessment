import React, { useEffect, useRef } from "react";
import { AnswerSheetPage, BoundingBox } from "@/types/assessment";
import { BoundingBoxOverlay } from "./BoundingBoxOverlay";

interface DocumentCanvasProps {
  page: AnswerSheetPage;
  zoomLevel: number;
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
 * High-resolution canvas/image document page renderer with coordinate-based interactive bounding box overlays.
 */
export function DocumentCanvas({
  page,
  zoomLevel,
  activeQuestionId,
  boxes,
  onSelectQuestion,
}: DocumentCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // If page is provided as data URL / image, load and ensure crisp rendering
  useEffect(() => {
    if (!page.imageUrl) return;

    // Optional: render directly to canvas for ultra crisp rendering if needed
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = page.imageUrl;
    img.onload = () => {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const displayWidth = Math.round(800 * (zoomLevel / 100));
      const displayHeight = Math.round((img.height / img.width) * displayWidth);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
      }
    };
  }, [page.imageUrl, zoomLevel]);

  const targetWidth = Math.round(800 * (zoomLevel / 100));

  return (
    <div
      ref={containerRef}
      id={`page-card-${page.pageNumber}`}
      style={{
        width: `${targetWidth}px`,
        maxWidth: "100%",
      }}
      className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300 transition-all duration-150 select-none flex-shrink-0"
    >
      {/* Primary Page Canvas for High Sharpness */}
      <canvas
        ref={canvasRef}
        className="w-full h-auto block pointer-events-none"
        style={{ display: "block" }}
      />

      {/* Fallback image in case canvas is still loading */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.imageUrl}
          alt={`Answer Sheet Page ${page.pageNumber}`}
          className="w-full h-auto block"
        />
      </noscript>

      {/* Interactive Bounding Box Overlay Layer */}
      <BoundingBoxOverlay
        pageNumber={page.pageNumber}
        activeQuestionId={activeQuestionId}
        boxes={boxes}
        onSelectQuestion={onSelectQuestion}
      />

      {/* Subtle Page Badge at Top-Right Corner */}
      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-gray-900/70 backdrop-blur-xs text-white text-[10px] font-bold font-mono shadow-sm z-20 pointer-events-none">
        Page {page.pageNumber}
      </div>
    </div>
  );
}
