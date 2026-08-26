import React from "react";
import {
  ArrowLeft,
  ClipboardCheck,
  HelpCircle,
  Bell,
  Sparkles,
  ChevronDown,
  KeyRound,
  BarChart3,
  Menu,
} from "lucide-react";
import { VedaLogoIcon } from "@/components/icons/VedaLogo";

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  title?: string;
  onOpenApiKeyModal?: () => void;
  onOpenGradingModal?: () => void;
  onToggleMobileMenu?: () => void;
  hasApiKey?: boolean;
  scoreSummary?: { total: number; max: number; percentage: number };
}

export function Header({
  onBack,
  showBack = true,
  title = "Exams",
  onOpenApiKeyModal,
  onOpenGradingModal,
  onToggleMobileMenu,
  hasApiKey = false,
  scoreSummary,
}: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-4 md:px-6 flex items-center justify-between z-20 flex-shrink-0">
      {/* Left Area: Mobile Brand & Back + Breadcrumb */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger / Logo */}
        <div className="flex md:hidden items-center space-x-2 mr-1">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <VedaLogoIcon className="w-7 h-7" />
          )}
          <span className="font-extrabold text-base text-gray-900">VedaAI</span>
        </div>

        {/* Desktop Back & Title */}
        <div className="hidden md:flex items-center space-x-3">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              title="Go back"
              className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2]" />
            </button>
          )}

          <div className="flex items-center space-x-2 text-gray-700 font-semibold text-sm">
            <ClipboardCheck className="w-4 h-4 text-gray-400 stroke-[2]" />
            <span>{title}</span>
          </div>
        </div>
      </div>

      {/* Right Area: Tools, Score badge, API key & Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Live Score Pill if mapping is ready */}
        {scoreSummary && (
          <button
            type="button"
            onClick={onOpenGradingModal}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs font-bold shadow-xs cursor-pointer"
            title="Click to view full grading report"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>
              Score: {scoreSummary.total}/{scoreSummary.max} ({scoreSummary.percentage}%)
            </span>
          </button>
        )}

        {/* API Key Config Button */}
        <button
          type="button"
          onClick={onOpenApiKeyModal}
          title="Configure Gemini API Key"
          className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <KeyRound className="w-3.5 h-3.5 text-orange-500" />
          <span>{hasApiKey ? "API Key Configured" : "API Settings"}</span>
          <span className={`w-2 h-2 rounded-full ${hasApiKey ? "bg-emerald-500" : "bg-amber-400"}`} />
        </button>

        {/* Help Circle */}
        <button
          type="button"
          title="Help & Documentation"
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex"
        >
          <HelpCircle className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Notification Bell with Red Dot Indicator */}
        <div className="relative">
          <button
            type="button"
            title="Notifications"
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5722] ring-2 ring-white" />
        </div>

        {/* AI Sparkle Icon */}
        <button
          type="button"
          onClick={onOpenGradingModal}
          title="AI Assistant Insights"
          className="p-1.5 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors hidden sm:flex"
        >
          <Sparkles className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* User Profile Avatar & Name */}
        <div className="flex items-center space-x-2 pl-1 sm:pl-2 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-orange-200 shadow-xs">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="16" cy="16" r="16" fill="#1E293B"/>
              <circle cx="16" cy="12" r="6" fill="#FDBA74"/>
              <path d="M6 28C6 22.4772 10.4772 18 16 18C21.5228 18 26 22.4772 26 28" fill="#F97316"/>
            </svg>
          </div>
          <span className="hidden md:inline text-xs font-semibold text-gray-800">Madhur Rastogi</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:inline" />
        </div>
      </div>
    </header>
  );
}
