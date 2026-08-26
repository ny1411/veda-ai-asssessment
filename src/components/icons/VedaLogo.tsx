import React from "react";

export function VedaLogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-black rounded-xl text-white shadow-sm font-bold ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1.5">
        <rect width="40" height="40" rx="10" fill="#0F172A" />
        <path
          d="M10 11L18.5 29C19 30 21 30 21.5 29L30 11H24L20 22L16 11H10Z"
          fill="white"
        />
        <path
          d="M19 14L20 11L21 14L24 15L21 16L20 19L19 16L16 15L19 14Z"
          fill="#FF5722"
        />
      </svg>
    </div>
  );
}

export function SchoolCrestIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`flex-shrink-0 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 p-1.5 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-700">
        <path d="M24 4L8 10V22C8 31 15 39 24 44C33 39 40 31 40 22V10L24 4Z" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M24 12V32M24 32C20 30 15 30 13 32V18C15 16 20 16 24 18M24 32C28 30 33 30 35 32V18C33 16 28 16 24 18" stroke="#15803D" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="12" r="3" fill="#16A34A"/>
      </svg>
    </div>
  );
}
