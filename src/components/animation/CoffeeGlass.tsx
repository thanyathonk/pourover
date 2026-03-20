"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { memo } from "react";

type CoffeeGlassProps = {
  fillRatio: number;
  currentWaterG: number;
  isAnimating: boolean;
};

const SERVER_ASSET = "/coffee-server.svg";
const FRAME_WIDTH = 180;
const FRAME_HEIGHT = 260;
const SERVER_VIEWBOX = 180;
const SERVER_OFFSET_Y = (FRAME_HEIGHT - SERVER_VIEWBOX) / 2;
const WATER_LEFT_X = 6;
const WATER_RIGHT_X = 155;
const WATER_TOP_Y = 76;
const WATER_BOTTOM_Y = 182;
const WATER_CENTER_X = 90;
const INNER_VESSEL_PATH = [
  "M26 76",
  "C20 90 10 108 10 129",
  "C10 149 15 164 30 178",
  "C51 186 70 190 90 190",
  "C110 190 122 188 134 180",
  "C146 170 153 152 155 129",
  "C156 108 151 90 140 76",
  "Z",
].join(" ");

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function buildSurfacePath(surfaceY: number, leftWave: number, rightWave: number) {
  const leftX = WATER_LEFT_X;
  const rightX = WATER_RIGHT_X;
  const width = rightX - leftX;
  const midX = (leftX + rightX) / 2;

  return [
    `M${leftX} ${surfaceY}`,
    `C${leftX + width * 0.24} ${surfaceY - leftWave} ${midX - width * 0.16} ${surfaceY + rightWave} ${midX} ${surfaceY}`,
    `C${midX + width * 0.16} ${surfaceY - rightWave} ${rightX - width * 0.24} ${surfaceY + leftWave} ${rightX} ${surfaceY}`,
  ].join(" ");
}

function buildWaterBodyPath(surfaceY: number, leftWave: number, rightWave: number) {
  const leftX = WATER_LEFT_X;
  const rightX = WATER_RIGHT_X;

  return [
    buildSurfacePath(surfaceY, leftWave, rightWave),
    `L${rightX} ${WATER_BOTTOM_Y}`,
    `L${leftX} ${WATER_BOTTOM_Y}`,
    "Z",
  ].join(" ");
}

export const CoffeeGlass = memo(function CoffeeGlass({
  fillRatio,
  currentWaterG,
  isAnimating,
}: CoffeeGlassProps) {
  const safeFillRatio = clamp01(fillRatio);
  const surfaceY = WATER_BOTTOM_Y - (WATER_BOTTOM_Y - WATER_TOP_Y) * safeFillRatio;
  const settledY = Math.max(WATER_TOP_Y, surfaceY);

  const stillBody = buildWaterBodyPath(settledY, 1.1, 0.8);
  const waveBodyA = buildWaterBodyPath(settledY, 3.2, -1.8);
  const waveBodyB = buildWaterBodyPath(settledY, -1.8, 3.2);
  const stillSurface = buildSurfacePath(settledY, 1.1, 0.8);
  const waveSurfaceA = buildSurfacePath(settledY, 3.2, -1.8);
  const waveSurfaceB = buildSurfacePath(settledY, -1.8, 3.2);
  const innerSurface = buildSurfacePath(settledY + 3, 1.8, -0.9);

  return (
    <div className="relative h-[260px] w-[180px]">
      <div
        className="absolute left-0 w-[180px] h-[180px]"
        style={{ top: `${SERVER_OFFSET_Y}px` }}
      >
        <svg
          viewBox={`0 0 ${SERVER_VIEWBOX} ${SERVER_VIEWBOX}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <defs>
            <clipPath id="server-water-clip">
              <path d={INNER_VESSEL_PATH} />
            </clipPath>
            <linearGradient id="server-water-fill" gradientUnits="userSpaceOnUse" x1={WATER_CENTER_X} y1={WATER_TOP_Y} x2={WATER_CENTER_X} y2={WATER_BOTTOM_Y + 10}>
              <stop offset="0%" stopColor="rgba(165, 229, 255, 0.78)" />
              <stop offset="48%" stopColor="rgba(91, 181, 236, 0.82)" />
              <stop offset="100%" stopColor="rgba(24, 101, 170, 0.92)" />
            </linearGradient>
            <linearGradient id="server-water-highlight" gradientUnits="userSpaceOnUse" x1={WATER_CENTER_X} y1={WATER_TOP_Y} x2={WATER_CENTER_X} y2={WATER_TOP_Y + 44}>
              <stop offset="0%" stopColor="rgba(241, 250, 255, 0.28)" />
              <stop offset="100%" stopColor="rgba(241, 250, 255, 0.03)" />
            </linearGradient>
          </defs>

          {safeFillRatio > 0 ? (
            <g clipPath="url(#server-water-clip)">
              <motion.path
                initial={false}
                animate={{
                  d: isAnimating
                    ? [stillBody, waveBodyA, stillBody, waveBodyB, stillBody]
                    : stillBody,
                }}
                transition={{
                  duration: isAnimating ? 5 : 0.4,
                  ease: "easeInOut",
                  repeat: isAnimating ? Infinity : 0,
                }}
                fill="url(#server-water-fill)"
              />
              <motion.path
                initial={false}
                animate={{
                  d: isAnimating
                    ? [innerSurface, waveSurfaceA, innerSurface, waveSurfaceB, innerSurface]
                    : innerSurface,
                }}
                transition={{
                  duration: isAnimating ? 5 : 0.4,
                  ease: "easeInOut",
                  repeat: isAnimating ? Infinity : 0,
                }}
                fill="none"
                stroke="url(#server-water-highlight)"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.62"
              />
              <motion.path
                initial={false}
                animate={{
                  d: isAnimating
                    ? [stillSurface, waveSurfaceA, stillSurface, waveSurfaceB, stillSurface]
                    : stillSurface,
                }}
                transition={{
                  duration: isAnimating ? 5 : 0.4,
                  ease: "easeInOut",
                  repeat: isAnimating ? Infinity : 0,
                }}
                fill="none"
                stroke="rgba(241, 250, 255, 0.9)"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              {/* <ellipse
                cx={WATER_CENTER_X}
                cy={WATER_BOTTOM_Y - 1}
                rx="34"
                ry="8"
                fill="rgba(214, 243, 255, 0.16)"
              /> */}
            </g>
          ) : null}
        </svg>

        <Image
          src={SERVER_ASSET}
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          className="pointer-events-none absolute inset-0 object-contain opacity-30 [filter:brightness(0)_invert(1)]"
        />
      </div>

      <svg
        viewBox={`0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <text
          x="20"
          y="248"
          fontSize="10"
          fill="rgba(255,255,255,0.38)"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          letterSpacing="0.12em"
        >
          {Math.round(currentWaterG)}g
        </text>
      </svg>
    </div>
  );
});
