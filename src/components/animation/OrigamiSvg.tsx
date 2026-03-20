type OrigamiSvgProps = {
  className?: string;
};

export function OrigamiSvg({ className }: OrigamiSvgProps) {
  return (
    <svg viewBox="0 0 240 240" className={className} fill="none">
      <path
        d="M72 58 L168 58 L150 180 L90 180 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M82 64 L78 174" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M96 64 L92 178" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M110 64 L106 180" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M130 64 L134 180" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M144 64 L148 178" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M158 64 L162 174" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M102 180 L138 180 L150 206 L90 206 Z" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
