import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BoundingBox } from "@/types/assessment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getScoreBadgeVariant(awarded: number, max: number): {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  pillText: string;
  isFull: boolean;
  isZero: boolean;
} {
  const isZero = awarded === 0;
  const isFull = awarded === max && max > 0;
  const ratio = max > 0 ? awarded / max : 0;

  if (isZero) {
    return {
      badgeBg: "bg-red-50 text-red-600 border-red-200",
      badgeText: "text-red-600",
      badgeBorder: "border-red-200",
      pillText: `${awarded}/${max}`,
      isFull: false,
      isZero: true,
    };
  }

  if (isFull || ratio >= 0.8) {
    return {
      badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      badgeText: "text-emerald-600",
      badgeBorder: "border-emerald-200",
      pillText: `${awarded}/${max}`,
      isFull: true,
      isZero: false,
    };
  }

  // Partial / Medium
  return {
    badgeBg: "bg-amber-50 text-amber-600 border-amber-200",
    badgeText: "text-amber-600",
    badgeBorder: "border-amber-200",
    pillText: `${awarded}/${max}`,
    isFull: false,
    isZero: false,
  };
}

/**
 * Converts bounding box coordinates (SVG pixels 800x1100, normalized 0-1000, or 0-100%) to CSS percentage positioning
 */
export function boundingBoxToPercentages(
  box: BoundingBox,
  pageWidth = 800,
  pageHeight = 1100
): {
  top: string;
  left: string;
  width: string;
  height: string;
} {
  // If coordinates are 0-100 percentage values
  if (box.ymax <= 100 && box.xmax <= 100) {
    const top = box.ymin;
    const left = box.xmin;
    const width = box.xmax - box.xmin;
    const height = box.ymax - box.ymin;
    return {
      top: `${Math.max(0, Math.min(100, top))}%`,
      left: `${Math.max(0, Math.min(100, left))}%`,
      width: `${Math.max(2, Math.min(100, width))}%`,
      height: `${Math.max(2, Math.min(100, height))}%`,
    };
  }

  // If coordinates are in SVG / Document pixel space (width 800, height 1100)
  const isSvgPixelSpace = box.ymax > 1000 || (box.xmax <= 800 && box.ymax <= 1100);
  const scaleY = isSvgPixelSpace ? pageHeight : 1000;
  const scaleX = isSvgPixelSpace ? pageWidth : 1000;

  const top = (box.ymin / scaleY) * 100;
  const left = (box.xmin / scaleX) * 100;
  const width = ((box.xmax - box.xmin) / scaleX) * 100;
  const height = ((box.ymax - box.ymin) / scaleY) * 100;

  return {
    top: `${Math.max(0, Math.min(100, top))}%`,
    left: `${Math.max(0, Math.min(100, left))}%`,
    width: `${Math.max(2, Math.min(100, width))}%`,
    height: `${Math.max(2, Math.min(100, height))}%`,
  };
}
