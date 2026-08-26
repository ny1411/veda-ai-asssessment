import React, { useState } from "react";
import {
  Sparkles,
  X,
  FileSpreadsheet,
  CheckCircle,
  HelpCircle,
  BrainCircuit,
  Sliders,
  Layers,
} from "lucide-react";

interface TeacherToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherToolkitModal({
  isOpen,
  onClose,
}: TeacherToolkitModalProps) {
  const [activeTab, setActiveTab] = useState<"SETTINGS" | "RUBRIC" | "BATCH">("SETTINGS");
  const [strictness, setStrictness] = useState<number>(3); // 1 to 5
  const [autoSubparts, setAutoSubparts] = useState<boolean>(true);
  const [diagramOCR, setDiagramOCR] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-500 to-[#1E242D] text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs text-orange-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">AI Teacher&apos;s Toolkit</h2>
              <p className="text-xs text-orange-200">Intelligent Evaluation &amp; Configuration</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-gray-100 px-6 pt-3 space-x-4 bg-gray-50/70 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("SETTINGS")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "SETTINGS"
                ? "border-orange-500 text-orange-600 font-extrabold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Extraction &amp; Grading Rules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("RUBRIC")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "RUBRIC"
                ? "border-orange-500 text-orange-600 font-extrabold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Rubric &amp; Step Marking
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("BATCH")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "BATCH"
                ? "border-orange-500 text-orange-600 font-extrabold"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Batch Class Workflow
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          {activeTab === "SETTINGS" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-800 flex items-center justify-between">
                  <span>Grading Strictness Level</span>
                  <span className="text-orange-600 font-mono">Level {strictness} / 5</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={strictness}
                  onChange={(e) => setStrictness(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>1: Lenient (Keywords only)</span>
                  <span>3: Balanced (Standard CBSE/ICSE)</span>
                  <span>5: Strict (Exact technical accuracy)</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoSubparts}
                    onChange={(e) => setAutoSubparts(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-orange-600 accent-orange-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900">Separate Sub-parts into Discrete Entries</p>
                    <p className="text-[11px] text-gray-500">
                      e.g., 11(a) and 11(b) receive individual coordinate bounding boxes and distinct scores.
                    </p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={diagramOCR}
                    onChange={(e) => setDiagramOCR(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-orange-600 accent-orange-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900">Enable Diagrammatic &amp; Formula Vision OCR</p>
                    <p className="text-[11px] text-gray-500">
                      Evaluates anatomical labels, flowcharts, chemical reactions, and mathematical steps.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === "RUBRIC" && (
            <div className="space-y-3 text-xs text-gray-700">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/70 space-y-1">
                <span className="font-bold text-gray-900">Current Grading Formula</span>
                <p className="text-[11px] text-gray-500">
                  Total Score = Sum(Question Awarded Marks). Partial marks are awarded based on step-wise formula derivation, diagram completeness, and keyword matching.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                  <strong>Full Credit (100%):</strong> All key concepts and clear diagrams present.
                </div>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-900">
                  <strong>Partial Credit (50-80%):</strong> Concept understood, minor labeling omissions.
                </div>
              </div>
            </div>
          )}

          {activeTab === "BATCH" && (
            <div className="space-y-3 text-xs text-gray-600">
              <p>
                In production mode, the VedaAI pipeline supports uploading a batch zip of student answer sheets against a single question paper to grade the whole class simultaneously.
              </p>
              <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200 text-orange-950 flex items-center space-x-3">
                <BrainCircuit className="w-8 h-8 text-orange-500 flex-shrink-0" />
                <div>
                  <strong className="block text-xs">Batch Processing Ready</strong>
                  <span className="text-[11px]">Contact school admin for Class 10-A batch roster integration.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1E242D] hover:bg-[#2B3441] rounded-xl shadow-xs transition-all"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}
