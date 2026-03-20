type WavePaperFilterSvgProps = {
  className?: string;
};

/**
 * Wave Paper (Kalita Wave) filter for Origami dripper.
 * Flat bottom with pleated sides, aligned to Origami cone (top ~82–158, bottom ~96–144).
 */
export function WavePaperFilterSvg({ className }: WavePaperFilterSvgProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Main outline: top opening, tapered sides, flat rounded bottom */}
      <path
        d="
          M 82 64
          L 158 64
          C 154 90 148 116 144 142
          L 143 162
          Q 141 178 120 178
          Q 99 178 97 162
          L 96 142
          C 92 116 86 90 82 64
          Z
        "
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.08)"
      />
      {/* Wave pleats – horizontal ridges suggesting pleated paper */}
      <path d="M 90 82 L 150 82" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <path d="M 88 100 L 152 100" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <path d="M 86 118 L 154 118" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <path d="M 92 136 L 148 136" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
    </svg>
  );
}
