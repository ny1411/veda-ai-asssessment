import React, { useRef, useState } from "react";
import { Upload, ArrowRight, X, Sparkles, AlertCircle, KeyRound } from "lucide-react";
import { TeacherIllustration } from "@/components/icons/TeacherIllustration";
import { UploadedFileInfo } from "@/types/assessment";
import { formatFileSize } from "@/lib/utils";
import { processUploadedFileToImages } from "@/lib/file-converter";

interface UploadScreenProps {
  questionPaper: UploadedFileInfo | null;
  answerSheet: UploadedFileInfo | null;
  errorMessage?: string | null;
  onClearError?: () => void;
  onOpenApiKeyModal?: () => void;
  onQuestionPaperSelected: (file: File | null, info?: Partial<UploadedFileInfo>) => void;
  onAnswerSheetSelected: (file: File | null, info?: Partial<UploadedFileInfo>) => void;
  onStartMapping: () => void;
  onLoadSample: () => void;
}

export function UploadScreen({
  questionPaper,
  answerSheet,
  errorMessage,
  onClearError,
  onOpenApiKeyModal,
  onQuestionPaperSelected,
  onAnswerSheetSelected,
  onStartMapping,
  onLoadSample,
}: UploadScreenProps) {
  const qpInputRef = useRef<HTMLInputElement>(null);
  const asInputRef = useRef<HTMLInputElement>(null);
  const [dragOverQp, setDragOverQp] = useState(false);
  const [dragOverAs, setDragOverAs] = useState(false);

  const canStart = Boolean(questionPaper && answerSheet);
  const isApiKeyError = errorMessage?.toLowerCase().includes("api key") || errorMessage?.toLowerCase().includes("gemini");

  const handleProcessQpFile = async (file: File) => {
    if (onClearError) onClearError();
    onQuestionPaperSelected(file, {
      name: file.name,
      sizeFormatted: formatFileSize(file.size),
      pageCount: file.type.includes("pdf") ? 2 : 1,
    });
    try {
      const { pageImages, pageCount } = await processUploadedFileToImages(file);
      onQuestionPaperSelected(file, {
        name: file.name,
        sizeFormatted: formatFileSize(file.size),
        pageCount: Math.max(1, pageCount),
        dataBase64List: pageImages,
      });
    } catch (err) {
      console.warn("Could not extract PDF pages ahead of time:", err);
    }
  };

  const handleProcessAsFile = async (file: File) => {
    if (onClearError) onClearError();
    onAnswerSheetSelected(file, {
      name: file.name,
      sizeFormatted: formatFileSize(file.size),
      pageCount: file.type.includes("pdf") ? 4 : 1,
    });
    try {
      const { pageImages, pageCount } = await processUploadedFileToImages(file);
      onAnswerSheetSelected(file, {
        name: file.name,
        sizeFormatted: formatFileSize(file.size),
        pageCount: Math.max(1, pageCount),
        dataBase64List: pageImages,
      });
    } catch (err) {
      console.warn("Could not extract PDF pages ahead of time:", err);
    }
  };

  const handleQpFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessQpFile(file);
  };

  const handleAsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessAsFile(file);
  };

  const handleDropQp = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverQp(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessQpFile(file);
  };

  const handleDropAs = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverAs(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessAsFile(file);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 max-w-5xl mx-auto w-full">
      {/* Title Section */}
      <div className="text-center space-y-2 mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex flex-wrap items-center justify-center gap-2">
          <span>Upload</span>
          <span className="inline-block bg-[#FFE4D6] text-[#FF5722] px-3.5 py-0.5 rounded-2xl shadow-xs">
            Question Paper &amp; Answer Sheets
          </span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 font-medium">
          Upload both files to get started
        </p>
      </div>

      {/* Prominent Error Banner if API or processing failed */}
      {errorMessage && (
        <div className="w-full max-w-3xl mb-6 p-4 rounded-2xl bg-red-50/90 border border-red-200 text-red-900 flex items-start justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-red-900">{errorMessage}</p>
              {isApiKeyError && onOpenApiKeyModal && (
                <button
                  type="button"
                  onClick={onOpenApiKeyModal}
                  className="mt-1 inline-flex items-center space-x-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Configure Gemini API Key</span>
                </button>
              )}
            </div>
          </div>
          {onClearError && (
            <button
              type="button"
              onClick={onClearError}
              className="text-red-400 hover:text-red-700 p-1 rounded-lg hover:bg-red-100 transition-colors"
              title="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Orbiting Teacher Illustration */}
      <div className="mb-6 md:mb-8 flex justify-center">
        <TeacherIllustration className="w-36 h-36 md:w-44 md:h-44" />
      </div>

      {/* Upload Dropzones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl mb-8">
        {/* Hidden inputs */}
        <input
          ref={qpInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleQpFileChange}
          className="hidden"
        />
        <input
          ref={asInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleAsFileChange}
          className="hidden"
        />

        {/* 1. Question Paper Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOverQp(true);
          }}
          onDragLeave={() => setDragOverQp(false)}
          onDrop={handleDropQp}
          onClick={() => !questionPaper && qpInputRef.current?.click()}
          className={`min-h-[160px] md:min-h-[180px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all ${
            dragOverQp
              ? "border-[#FF5722] bg-orange-50/50 scale-[1.01]"
              : questionPaper
              ? "border-gray-200 bg-white shadow-xs"
              : "border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50/30 cursor-pointer shadow-xs"
          }`}
        >
          {questionPaper ? (
            /* Filled State Card */
            <div className="relative w-full bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex items-center space-x-3 text-left">
              {/* PDF Icon */}
              <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
                PDF
              </div>
              {/* File Info */}
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-sm font-bold text-gray-900 truncate" title={questionPaper.name}>
                  {questionPaper.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {questionPaper.sizeFormatted} • {questionPaper.pageCount} Pages
                </p>
              </div>
              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuestionPaperSelected(null);
                  if (onClearError) onClearError();
                  if (qpInputRef.current) qpInputRef.current.value = "";
                }}
                className="absolute right-3 top-3 w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-900 text-white flex items-center justify-center transition-transform hover:scale-110"
                title="Remove file"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center shadow-xs">
                <Upload className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <p className="text-sm text-gray-800 font-medium">
                  Upload <span className="text-[#FF5722] font-bold">Question Paper</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Max 10MB (PDF or Images)</p>
              </div>
            </div>
          )}
        </div>

        {/* 2. Answer Sheet Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOverAs(true);
          }}
          onDragLeave={() => setDragOverAs(false)}
          onDrop={handleDropAs}
          onClick={() => !answerSheet && asInputRef.current?.click()}
          className={`min-h-[160px] md:min-h-[180px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all ${
            dragOverAs
              ? "border-[#FF5722] bg-orange-50/50 scale-[1.01]"
              : answerSheet
              ? "border-gray-200 bg-white shadow-xs"
              : "border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50/30 cursor-pointer shadow-xs"
          }`}
        >
          {answerSheet ? (
            /* Filled State Card */
            <div className="relative w-full bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex items-center space-x-3 text-left">
              {/* PDF Icon */}
              <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
                PDF
              </div>
              {/* File Info */}
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-sm font-bold text-gray-900 truncate" title={answerSheet.name}>
                  {answerSheet.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {answerSheet.sizeFormatted} • {answerSheet.pageCount} Pages
                </p>
              </div>
              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAnswerSheetSelected(null);
                  if (onClearError) onClearError();
                  if (asInputRef.current) asInputRef.current.value = "";
                }}
                className="absolute right-3 top-3 w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-900 text-white flex items-center justify-center transition-transform hover:scale-110"
                title="Remove file"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center shadow-xs">
                <Upload className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <p className="text-sm text-gray-800 font-medium">
                  Upload <span className="text-[#FF5722] font-bold">Answer Sheet</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Max 10MB (PDF or Images)</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Area */}
      <div className="flex flex-col items-center space-y-3">
        <button
          type="button"
          disabled={!canStart}
          onClick={onStartMapping}
          className={`px-8 py-3 rounded-full font-bold text-sm flex items-center space-x-2.5 transition-all shadow-md ${
            canStart
              ? "bg-[#1E242D] hover:bg-[#2B3441] text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-gray-900/10"
              : "bg-gray-400 text-white opacity-90 cursor-not-allowed"
          }`}
        >
          <span>Start Mapping</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-gray-500 text-center">
          Once both files are uploaded, you&apos;ll able to map answers with questions
        </p>

        {/* Instant Evaluation Demo Bar */}
        <div className="pt-4 flex items-center">
          <button
            type="button"
            onClick={onLoadSample}
            className="group flex items-center space-x-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 text-orange-900 hover:border-orange-400 hover:shadow-xs transition-all text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5722] animate-bounce" />
            <span>Load Class 10 Biology Sample (Pre-filled Figma Benchmark)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
