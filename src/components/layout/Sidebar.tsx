import React from "react";
import {
  LayoutGrid,
  Users,
  FileText,
  ClipboardCheck,
  Clock,
  Settings,
  Sparkles,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { VedaLogoIcon, SchoolCrestIcon } from "@/components/icons/VedaLogo";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
  activeItem?: string;
  onOpenTeacherToolkit?: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  activeItem = "Exams",
  onOpenTeacherToolkit,
}: SidebarProps) {
  const navItems = [
    { label: "Home", icon: LayoutGrid },
    { label: "My Classroom", icon: Users },
    { label: "Assignments", icon: FileText },
    { label: "Exams", icon: ClipboardCheck },
    { label: "My Library", icon: Clock },
  ];

  if (collapsed) {
    return (
      <aside className="w-[68px] h-screen bg-white border-r border-gray-100 flex flex-col justify-between items-center py-4 select-none transition-all duration-300 z-30 shadow-sm flex-shrink-0">
        {/* Top Section */}
        <div className="flex flex-col items-center space-y-5 w-full">
          {/* Logo */}
          <div className="cursor-pointer" onClick={onToggleCollapse} title="VedaAI">
            <VedaLogoIcon className="w-10 h-10" />
          </div>

          {/* AI Toolkit Icon Button with Orange Ring Glow */}
          <button
            type="button"
            onClick={onOpenTeacherToolkit}
            title="AI Teacher's Toolkit"
            className="relative w-10 h-10 rounded-full bg-[#1E242D] border border-orange-500/80 text-orange-400 flex items-center justify-center shadow-md shadow-orange-500/10 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
          </button>

          {/* Nav Icons */}
          <nav className="flex flex-col items-center space-y-2 w-full px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  title={item.label}
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-gray-800 stroke-[2.2]" : "stroke-[1.8]")} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-3 w-full px-2">
          {/* School Badge Icon */}
          <div title="Delhi Public School, Bokaro Steel City" className="cursor-pointer hover:opacity-85">
            <SchoolCrestIcon className="w-9 h-9" />
          </div>

          {/* Expand Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Expand Sidebar"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-gray-100 flex flex-col justify-between p-4 select-none transition-all duration-300 z-30 shadow-sm flex-shrink-0">
      {/* Top Section */}
      <div className="flex flex-col space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2.5">
            <VedaLogoIcon className="w-9 h-9" />
            <span className="text-xl font-extrabold tracking-tight text-gray-900">VedaAI</span>
          </div>
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Collapse Sidebar"
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <PanelLeftClose className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        {/* AI Teacher's Toolkit Pill Button */}
        <button
          type="button"
          onClick={onOpenTeacherToolkit}
          className="group relative w-full py-2.5 px-4 rounded-full bg-[#1E242D] border border-orange-500/70 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-md shadow-orange-500/10 hover:bg-[#252C37] hover:border-orange-500 transition-all active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="tracking-wide">AI Teacher&apos;s Toolkit</span>
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            return (
              <button
                key={item.label}
                type="button"
                className={cn(
                  "flex items-center space-x-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full",
                  isActive
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-gray-800 stroke-[2.2]" : "text-gray-500 stroke-[1.8]")} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col space-y-4">
        {/* Settings Item */}
        <button
          type="button"
          className="flex items-center space-x-3.5 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-500 stroke-[1.8]" />
          <span>Settings</span>
        </button>

        {/* School Profile Card */}
        <div className="flex items-center space-x-3 p-2.5 rounded-2xl bg-gray-50/80 border border-gray-100">
          <SchoolCrestIcon className="w-10 h-10" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-gray-900 truncate">Delhi Public School</span>
            <span className="text-[11px] text-gray-500 truncate">Bokaro Steel City</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
