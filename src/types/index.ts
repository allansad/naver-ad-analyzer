export type BigCategory =
  | '필름'
  | '마루'
  | '장판'
  | '벽지(실크)'
  | '벽지(합지)'
  | '벽지'
  | '세트'
  | '기타';

export interface AdItem {
  title: string;
  status: string;
  bid: number;
  quality: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cost: number;
  conversions: number;
  cvr: number;
  revenue: number;
  roas: number;
  cpa: number;
  purchaseConv: number;
  purchaseRev: number;
  bigCategory: BigCategory;
  shortCategory: string;
  url: string;
  price: number;
}

export interface AdTotals {
  cost: number;
  revenue: number;
  conversions: number;
  impressions: number;
  clicks: number;
  purchaseConv: number;
  purchaseRev: number;
  roas: number;
  ctr: number;
  cvr: number;
  cpa: number;
  cpc: number;
}

export interface ParsedReport {
  /** 운영 가능 상태인 소재만. 모든 분석/차트에 사용 */
  items: AdItem[];
  /** 중지/비정상 상태 소재. 운영 점검 테이블에만 사용 */
  inactiveItems: AdItem[];
  /** 운영 가능 소재 기반 합계 */
  totals: AdTotals;
}

export function isActiveStatus(status: string): boolean {
  return status === '운영 가능';
}

export type EfficiencyTag = 'success' | 'warning' | 'danger' | 'muted';

export interface EfficiencyClassification {
  tag: EfficiencyTag;
  label: string;
}
