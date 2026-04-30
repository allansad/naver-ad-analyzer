import { Typography, Stack } from '@mui/material';
import { MetricPageTemplate } from '../../components/MetricPageTemplate';
import { MetricBarChart } from '../../components/charts/MetricBarChart';
import { useData } from '../../context/DataContext';
import { formatNum } from '../../utils/format';
import { categoryColors } from '../../utils/classify';

export function ImpressionsPage() {
  const { report } = useData();

  const chart = report ? (
    <MetricBarChart
      data={report.items.map((it) => ({
        title: it.title,
        value: it.impressions,
        color: categoryColors[it.bigCategory] ?? '#3b82f6',
      }))}
      valueLabel="노출수"
      formatValue={(v) => formatNum(v)}
      topN={20}
    />
  ) : null;

  const insights = report ? (
    <Stack spacing={1}>
      <Typography variant="body2">
        총 노출수: <strong>{formatNum(report.totals.impressions)}</strong>회
      </Typography>
      <Typography variant="body2" color="text.secondary">
        가장 노출이 많은 소재가 광고비를 가장 많이 쓰는 소재라고 단정하면 안 됩니다. 노출은 많지만
        효율이 나쁜 소재일 수 있으므로, 다음 페이지(CTR, CPC)에서 같이 봐야 합니다.
      </Typography>
    </Stack>
  ) : null;

  return (
    <MetricPageTemplate
      emoji="👁"
      title="노출수"
      englishName="Impressions"
      oneLineDef="광고가 사용자에게 보여진 횟수"
      formula="노출수 = 광고가 화면에 표시된 횟수"
      whyImportant="노출수는 광고가 얼마나 많은 사람에게 도달했는지를 나타내는 가장 기본적인 지표입니다. 단, 노출이 많다고 좋은 것이 아닙니다 — 진짜 중요한 건 그 노출이 클릭과 전환으로 이어지는가입니다. 노출은 '도달의 양'이지 '효율의 질'이 아닙니다."
      benchmarks={[
        { range: '비교 지표 X', label: '노출수 자체에는 절대적 기준이 없습니다. 업종/예산/키워드에 따라 천차만별', color: 'default' },
      ]}
      pitfalls={[
        '"노출수가 많으니 광고가 잘 되고 있다"는 잘못된 판단입니다. 검색 의도와 무관한 키워드에 광고가 걸려서 노출만 쌓일 수 있습니다.',
        '디스플레이/콘텐츠 매체는 모바일에서 노출이 폭증하지만 CTR이 매우 낮을 수 있습니다.',
        '노출만 보고 광고비를 늘리면 "양은 많지만 질은 낮은" 트래픽만 늘어납니다.',
      ]}
      chart={chart}
      insights={insights}
    />
  );
}
