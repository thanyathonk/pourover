export function formatRatio(ratio: number) {
  return `1:${ratio.toFixed(1)}`;
}

export function formatGrams(value: number) {
  return `${Math.round(value)}g`;
}
