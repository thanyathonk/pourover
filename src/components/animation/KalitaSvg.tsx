type KalitaSvgProps = {
  className?: string;
};

export function KalitaSvg({ className }: KalitaSvgProps) {
  return (
    <svg viewBox="0 0 240 240" className={className} fill="none">
      <path
        d="M62 74 L178 74 L160 170 L80 170 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M70 90 L170 90" stroke="currentColor" strokeOpacity="0.55" />
      <path d="M68 108 L172 108" stroke="currentColor" strokeOpacity="0.45" />
      <path d="M66 126 L174 126" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M82 170 L158 170 L150 204 L90 204 Z" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
