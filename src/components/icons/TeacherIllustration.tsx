import React from "react";
import { Camera, Clock, CloudUpload, Sparkles } from "lucide-react";

export function TeacherIllustration({ className = "w-44 h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow & Gradient Circles */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-amber-100/20 blur-sm scale-110" />
      <div className="absolute inset-2 rounded-full border border-orange-200/60 bg-gradient-to-b from-orange-50/80 to-orange-100/50" />
      <div className="absolute inset-6 rounded-full border border-dashed border-orange-300/60 animate-spin" style={{ animationDuration: "40s" }} />

      {/* Orbiting Orange Icon Badges */}
      {/* Top Right: Clock */}
      <div className="absolute top-2 right-4 w-7 h-7 rounded-full bg-[#FF6B35] text-white flex items-center justify-center shadow-md shadow-orange-500/20 z-10 transition-transform hover:scale-110">
        <Clock className="w-3.5 h-3.5" />
      </div>

      {/* Top Left: Camera/Scan */}
      <div className="absolute top-10 left-1 w-7 h-7 rounded-full bg-[#FF6B35] text-white flex items-center justify-center shadow-md shadow-orange-500/20 z-10 transition-transform hover:scale-110">
        <Camera className="w-3.5 h-3.5" />
      </div>

      {/* Bottom Right: Cloud Upload */}
      <div className="absolute bottom-8 right-1 w-7 h-7 rounded-full bg-[#FF6B35] text-white flex items-center justify-center shadow-md shadow-orange-500/20 z-10 transition-transform hover:scale-110">
        <CloudUpload className="w-3.5 h-3.5" />
      </div>

      {/* Bottom Center: Sparkles/Settings */}
      <div className="absolute bottom-1 left-10 w-7 h-7 rounded-full bg-[#FF6B35] text-white flex items-center justify-center shadow-md shadow-orange-500/20 z-10 transition-transform hover:scale-110">
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      {/* Central 3D Teacher Avatar SVG */}
      <div className="relative z-0 w-28 h-28 rounded-full overflow-hidden flex items-end justify-center bg-gradient-to-b from-slate-100 to-orange-50 shadow-inner">
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Hair back */}
          <path d="M50 70C45 40 115 40 110 70C110 95 120 120 120 130H40C40 120 50 95 50 70Z" fill="#1E293B"/>
          {/* Body/Suit */}
          <path d="M35 155C35 125 60 120 80 120C100 120 125 125 125 155" fill="#334155"/>
          {/* Shirt/Inner Collar */}
          <polygon points="80,120 68,140 92,140" fill="#FFFFFF"/>
          <polygon points="77,140 83,140 80,150" fill="#3B82F6"/>
          {/* Neck */}
          <rect x="73" y="96" width="14" height="26" fill="#FBCFE8" rx="7"/>
          {/* Face */}
          <ellipse cx="80" cy="78" rx="26" ry="30" fill="#FED7AA"/>
          {/* Hair front */}
          <path d="M54 68C54 48 70 42 80 42C95 42 106 50 106 68C100 60 90 56 80 58C68 60 60 65 54 68Z" fill="#0F172A"/>
          {/* Glasses Frame */}
          <rect x="59" y="68" width="18" height="13" rx="3" fill="none" stroke="#0F172A" strokeWidth="2"/>
          <rect x="83" y="68" width="18" height="13" rx="3" fill="none" stroke="#0F172A" strokeWidth="2"/>
          <line x1="77" y1="74" x2="83" y2="74" stroke="#0F172A" strokeWidth="2"/>
          {/* Eyes */}
          <circle cx="68" cy="74" r="2.5" fill="#1E293B"/>
          <circle cx="92" cy="74" r="2.5" fill="#1E293B"/>
          {/* Smile */}
          <path d="M73 92C76 96 84 96 87 92" stroke="#BE123C" strokeWidth="2" strokeLinecap="round"/>
          {/* Notebook in hands */}
          <rect x="62" y="132" width="36" height="28" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5"/>
          <line x1="68" y1="140" x2="92" y2="140" stroke="#CBD5E1" strokeWidth="1.5"/>
          <line x1="68" y1="146" x2="88" y2="146" stroke="#CBD5E1" strokeWidth="1.5"/>
          {/* Hands */}
          <circle cx="60" cy="142" r="5" fill="#FED7AA"/>
          <circle cx="100" cy="142" r="5" fill="#FED7AA"/>
        </svg>
      </div>
    </div>
  );
}
