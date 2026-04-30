export function parseKoreanNum(v: unknown): number {
  if (v === null || v === undefined || v === '') return 0;
  if (typeof v === 'number') return v;
  const s = String(v).replace(/[원,%\s]/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

export function formatWon(n: number): string {
  return Math.round(n).toLocaleString('ko-KR') + '원';
}

export function formatPct(n: number, fractionDigits = 2): string {
  return n.toFixed(fractionDigits) + '%';
}

export function formatNum(n: number): string {
  return Math.round(n).toLocaleString('ko-KR');
}

export function shortenTitle(title: string, max = 30): string {
  const t = title.replace(/^\[샘플창고\]\s*/, '');
  return t.length > max ? t.slice(0, max) + '…' : t;
}
