import React from "react";
import { motion } from "framer-motion";

export function SparkleAnimation({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Soft Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 to-amber-300/30 blur-xl"
      />

      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Center Main 4-pointed Star */}
        <motion.path
          d="M100 25 C100 70, 100 70, 145 100 C100 100, 100 100, 100 145 C100 100, 100 100, 55 100 C100 70, 100 70, 100 25 Z"
          fill="url(#sparkleGrad)"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Small Bottom Left Star */}
        <motion.path
          d="M60 115 C60 135, 60 135, 80 148 C60 148, 60 148, 60 168 C60 148, 60 148, 40 148 C60 135, 60 135, 60 115 Z"
          fill="url(#sparkleGrad)"
          animate={{
            scale: [0.9, 1.15, 0.9],
            rotate: [0, -8, 8, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          style={{ transformOrigin: "60px 148px" }}
        />

        {/* Tiny Right Star */}
        <motion.path
          d="M150 115 C150 126, 150 126, 161 133 C150 133, 150 133, 150 144 C150 133, 150 133, 139 133 C150 126, 150 126, 150 115 Z"
          fill="url(#sparkleGrad)"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          style={{ transformOrigin: "150px 133px" }}
        />

        {/* Tiny Dot Accent */}
        <motion.circle
          cx="42"
          cy="92"
          r="4.5"
          fill="url(#sparkleGrad)"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
