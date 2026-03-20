type V60SvgProps = {
  className?: string;
};

export function V60Svg({ className }: V60SvgProps) {
  return (
    <svg viewBox="0 0 240 240" className={className} fill="none">
      <path
        d="M70 54 L170 54 L145 186 L95 186 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M88 77 L152 77" stroke="currentColor" strokeOpacity="0.65" />
      <path d="M84 100 L156 100" stroke="currentColor" strokeOpacity="0.45" />
      <path d="M80 124 L160 124" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M102 186 L138 186 L150 208 L90 208 Z" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
