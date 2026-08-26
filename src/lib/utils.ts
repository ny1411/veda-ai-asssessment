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
 * Converts normalized 0-1000 bounding box coordinates to CSS percentage positioning
 */
export function boundingBoxToPercentages(box: BoundingBox): {
  top: string;
  left: string;
  width: string;
  height: string;
} {
  // If coordinates are already 0-100 scale or 0-1000 scale:
  const scale = box.ymax > 100 ? 1000 : 100;
  
  const top = (box.ymin / scale) * 100;
  const left = (box.xmin / scale) * 100;
  const width = ((box.xmax - box.xmin) / scale) * 100;
  const height = ((box.ymax - box.ymin) / scale) * 100;

  return {
    top: `${Math.max(0, Math.min(100, top))}%`,
    left: `${Math.max(0, Math.min(100, left))}%`,
    width: `${Math.max(2, Math.min(100, width))}%`,
    height: `${Math.max(2, Math.min(100, height))}%`,
  };
}
