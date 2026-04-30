import type { BigCategory, EfficiencyClassification } from '../types';

export function classifyCategory(title: string, shortCat: string): BigCategory {
  const text = (title + ' ' + shortCat).toLowerCase();
  if (text.includes('필름') || text.includes('시트지')) return '필름';
  if (text.includes('마루')) return '마루';
  if (text.includes('장판')) return '장판';
  if (text.includes('실크벽지') || text.includes('실크 벽지')) return '벽지(실크)';
  if (text.includes('합지벽지') || text.includes('합지 벽지')) return '벽지(합지)';
  if (text.includes('벽지')) return '벽지';
  if (text.includes('세트') || text.includes('패키지')) return '세트';
  return '기타';
}

export function classifyEfficiency(roas: number, cost: number): EfficiencyClassification {
  if (cost < 1000) return { tag: 'muted', label: '데이터 부족' };
  if (roas === 0) return { tag: 'danger', label: '전환 없음' };
  if (roas >= 1000) return { tag: 'success', label: '우수' };
  if (roas >= 500) return { tag: 'success', label: '양호' };
  if (roas >= 300) return { tag: 'warning', label: '주의' };
  return { tag: 'danger', label: '손실 위험' };
}

export const categoryColors: Record<string, string> = {
  필름: '#8b5cf6',
  마루: '#f97316',
  장판: '#06b6d4',
  '벽지(실크)': '#ec4899',
  '벽지(합지)': '#f43f5e',
  벽지: '#ec4899',
  세트: '#84cc16',
  기타: '#94a3b8',
};

export const efficiencyColors: Record<string, string> = {
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  muted: '#94a3b8',
};
