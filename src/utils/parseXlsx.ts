import * as XLSX from 'xlsx';
import type { AdItem, AdTotals, ParsedReport, BigCategory } from '../types';
import { isActiveStatus } from '../types';
import { parseKoreanNum } from './format';
import { classifyCategory } from './classify';

interface ParsedSoiCell {
  title: string;
  price: number;
  categoryPath: string;
  shortCategory: string;
  bigCategory: BigCategory;
  url: string;
}

function parseSoiCell(raw: unknown): ParsedSoiCell {
  if (!raw) {
    return {
      title: '',
      price: 0,
      categoryPath: '',
      shortCategory: '기타',
      bigCategory: '기타',
      url: '',
    };
  }
  const parts = String(raw).split(',');
  if (parts.length < 6) {
    const t = String(raw);
    return {
      title: t,
      price: 0,
      categoryPath: '',
      shortCategory: '기타',
      bigCategory: classifyCategory(t, ''),
      url: '',
    };
  }
  const url = parts[parts.length - 3];
  const categoryPath = parts[parts.length - 4];
  const price = parseKoreanNum(parts[parts.length - 5]);
  const title = parts.slice(0, parts.length - 5).join(',').trim();

  let shortCategory = '기타';
  if (categoryPath && categoryPath.includes('>')) {
    const segs = categoryPath.split('>').map((s) => s.trim());
    shortCategory = segs[segs.length - 1] || segs[segs.length - 2] || '기타';
  }

  return {
    title,
    price,
    categoryPath,
    shortCategory,
    bigCategory: classifyCategory(title, shortCategory),
    url,
  };
}

export class XlsxParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'XlsxParseError';
  }
}

export async function parseXlsxFile(file: File): Promise<ParsedReport> {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(new Uint8Array(buffer), { type: 'array' });
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: '',
  });

  if (!rows || rows.length < 3) {
    throw new XlsxParseError('데이터가 부족합니다. 헤더, 합계 행, 소재 데이터가 필요합니다.');
  }

  const headers = (rows[0] as unknown[]).map((h) => String(h).trim());
  const expected = ['소재', '상태', '소재 ID', '노출수', '클릭수', '총비용', '총 광고수익률(%)'];
  const missing = expected.filter((h) => !headers.includes(h));
  if (missing.length > 0) {
    throw new XlsxParseError(
      `이 파일은 "소재 목록" 보고서가 아닌 것 같습니다. 누락 컬럼: ${missing.join(', ')}`,
    );
  }

  const idx: Record<string, number> = {};
  headers.forEach((h, i) => {
    idx[h] = i;
  });

  const get = (row: unknown[], col: string): unknown => row[idx[col]];

  let totalRow: unknown[] | null = null;
  let dataStartIdx = 1;
  if (rows[1] && String((rows[1] as unknown[])[idx['소재']] ?? '').includes('결과')) {
    totalRow = rows[1] as unknown[];
    dataStartIdx = 2;
  }

  // totalRow는 더 이상 사용하지 않음 (운영 가능 소재만으로 직접 계산)
  void totalRow;

  const allItems: AdItem[] = [];
  for (let i = dataStartIdx; i < rows.length; i++) {
    const row = rows[i] as unknown[];
    if (!row || row.every((v) => v === '' || v === null)) continue;
    const soiRaw = get(row, '소재');
    if (!soiRaw) continue;

    const parsed = parseSoiCell(soiRaw);
    allItems.push({
      ...parsed,
      status: String(get(row, '상태') ?? ''),
      bid: parseKoreanNum(get(row, '현재 입찰가(VAT미포함)')),
      quality: parseKoreanNum(get(row, '품질지수')),
      impressions: parseKoreanNum(get(row, '노출수')),
      clicks: parseKoreanNum(get(row, '클릭수')),
      ctr: parseKoreanNum(get(row, '클릭률(%)')),
      cpc: parseKoreanNum(get(row, '평균 CPC')),
      cost: parseKoreanNum(get(row, '총비용')),
      conversions: parseKoreanNum(get(row, '총 전환수')),
      cvr: parseKoreanNum(get(row, '총 전환율(%)')),
      revenue: parseKoreanNum(get(row, '총 전환매출액')),
      roas: parseKoreanNum(get(row, '총 광고수익률(%)')),
      cpa: parseKoreanNum(get(row, '총 전환당비용')),
      purchaseConv: parseKoreanNum(get(row, '구매완료 전환수')),
      purchaseRev: parseKoreanNum(get(row, '구매완료 전환매출액')),
    });
  }

  // 운영 가능 / 중지 분리
  const items = allItems.filter((it) => isActiveStatus(it.status));
  const inactiveItems = allItems.filter((it) => !isActiveStatus(it.status));

  if (items.length === 0) {
    throw new XlsxParseError(
      '운영 가능 상태인 소재가 없습니다. 모든 소재가 중지 상태일 수 있습니다.',
    );
  }

  // 운영 가능 소재 기준으로 totals 직접 계산
  const acc = items.reduce(
    (a, it) => {
      a.cost += it.cost;
      a.revenue += it.revenue;
      a.conversions += it.conversions;
      a.impressions += it.impressions;
      a.clicks += it.clicks;
      a.purchaseConv += it.purchaseConv;
      a.purchaseRev += it.purchaseRev;
      return a;
    },
    {
      cost: 0,
      revenue: 0,
      conversions: 0,
      impressions: 0,
      clicks: 0,
      purchaseConv: 0,
      purchaseRev: 0,
    },
  );
  const totals: AdTotals = {
    ...acc,
    roas: acc.cost > 0 ? (acc.revenue / acc.cost) * 100 : 0,
    ctr: acc.impressions > 0 ? (acc.clicks / acc.impressions) * 100 : 0,
    cvr: acc.clicks > 0 ? (acc.conversions / acc.clicks) * 100 : 0,
    cpa: acc.conversions > 0 ? acc.cost / acc.conversions : 0,
    cpc: acc.clicks > 0 ? acc.cost / acc.clicks : 0,
  };

  return { items, inactiveItems, totals };
}
