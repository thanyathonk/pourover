"use client";

import { motion } from "motion/react";

export function HeroBrewShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(129,212,250,0.16),_transparent_38%),linear-gradient(180deg,rgba(13,18,30,0.96),rgba(7,11,22,0.98))] p-6 shadow-[0_28px_100px_rgba(3,8,24,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-[46%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/16 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="space-y-3">
          {[
            { label: "Bloom", value: "45s" },
            { label: "Pulse", value: "3 pours" },
            { label: "Drawdown", value: "Clean finish" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * index, duration: 0.6 }}
              className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-xl"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative min-h-[340px] rounded-[28px] border border-white/8 bg-black/20">
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-3xl" />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-300/12 blur-3xl"
          />

          <svg viewBox="0 0 520 340" className="relative z-10 h-full w-full" fill="none">
            <motion.path
              d="M188 52H332L288 126H232L188 52Z"
              stroke="rgba(255,255,255,0.72)"
              strokeWidth="3"
              strokeLinejoin="round"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.g
              animate={{ x: [0, 2, -2, 0], y: [0, -1, 1, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.path
                d="M255 20C258 66 258 92 258 122"
                stroke="rgba(117,224,255,0.95)"
                strokeWidth="6"
                strokeLinecap="round"
                animate={{ opacity: [0.35, 1, 0.45], pathLength: [0.75, 1, 0.78] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />

              {[0, 0.45, 0.9].map((delay) => (
                <motion.circle
                  key={delay}
                  cx="258"
                  cy="130"
                  r="4"
                  fill="rgba(188,244,255,0.95)"
                  animate={{ y: [0, 16, 34], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeIn" }}
                />
              ))}
            </motion.g>

            <path
              d="M170 150C142 188 128 224 132 258C136 297 162 320 258 320C354 320 382 298 386 258C390 225 374 188 346 150H170Z"
              stroke="rgba(255,255,255,0.54)"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            <path
              d="M176 150C148 188 138 222 142 256C146 286 174 304 258 304C342 304 370 286 374 256C378 222 368 188 340 150H176Z"
              fill="rgba(0,0,0,0.16)"
            />

            <defs>
              <clipPath id="hero-brew-clip">
                <path d="M176 150C148 188 138 222 142 256C146 286 174 304 258 304C342 304 370 286 374 256C378 222 368 188 340 150H176Z" />
              </clipPath>
              <linearGradient id="hero-water-fill" x1="258" y1="196" x2="258" y2="340">
                <stop offset="0%" stopColor="rgba(154,229,255,0.9)" />
                <stop offset="100%" stopColor="rgba(63,139,211,0.88)" />
              </linearGradient>
            </defs>

            <g clipPath="url(#hero-brew-clip)">
              <motion.g
                animate={{ x: [0, 3, -3, 0], y: [0, -1, 1, 0] }}
                transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.path
                  d="M124 214C170 204 214 220 258 214C302 208 346 222 392 214V340H124V214Z"
                  fill="url(#hero-water-fill)"
                  animate={{
                    d: [
                      "M124 214C170 204 214 220 258 214C302 208 346 222 392 214V340H124V214Z",
                      "M124 210C170 222 214 204 258 210C302 216 346 202 392 210V340H124V210Z",
                      "M124 214C170 204 214 220 258 214C302 208 346 222 392 214V340H124V214Z",
                    ],
                  }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M146 214C188 208 222 218 258 214C294 210 328 218 368 214"
                  stroke="rgba(243,250,255,0.92)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{
                    d: [
                      "M146 214C188 208 222 218 258 214C294 210 328 218 368 214",
                      "M146 210C188 218 222 208 258 212C294 216 328 206 368 210",
                      "M146 214C188 208 222 218 258 214C294 210 328 218 368 214",
                    ],
                  }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.g>
            </g>

            <motion.path
              d="M210 92C232 114 242 130 246 144"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {[0, 1.2, 2.2].map((delay, index) => (
              <motion.path
                key={index}
                d={`M${214 + index * 28} 84C${206 + index * 28} 66 ${226 + index * 28} 58 ${218 + index * 28} 36`}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="3"
                strokeLinecap="round"
                animate={{ opacity: [0, 0.85, 0], y: [18, 0, -12] }}
                transition={{ duration: 3.4, repeat: Infinity, delay, ease: "easeOut" }}
              />
            ))}
          </svg>

          <div className="pointer-events-none absolute inset-x-6 bottom-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/32">
            <span>Auto motion</span>
            <span>Brew motion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
