import { Typography, Stack } from '@mui/material';
import { MetricPageTemplate } from '../../components/MetricPageTemplate';
import { HistogramChart } from '../../components/charts/HistogramChart';
import { useData } from '../../context/DataContext';

export function QualityScorePage() {
  const { report } = useData();

  const chart = report ? (() => {
    const buckets = Array.from({ length: 7 }, (_, i) => ({
      label: i.toString(),
      count: 0,
      color: i >= 5 ? '#10b981' : i >= 3 ? '#f59e0b' : '#ef4444',
    }));
    report.items.forEach((it) => {
      const q = Math.max(0, Math.min(6, Math.floor(it.quality)));
      buckets[q].count++;
    });
    return (
      <HistogramChart
        data={buckets}
        xLabel="품질지수 (0~6)"
        caption="네이버는 품질지수 0~6점을 부여합니다 (높을수록 좋음)"
      />
    );
  })() : null;

  const insights = report ? (() => {
    const lowQuality = report.items.filter((it) => it.quality > 0 && it.quality < 4).length;
    const highQuality = report.items.filter((it) => it.quality >= 5).length;
    return (
      <Stack spacing={1}>
        <Typography variant="body2">
          품질지수 5 이상: <strong>{highQuality}개</strong> · 4 미만: <strong>{lowQuality}개</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          품질지수가 낮은 소재는 같은 입찰가를 써도 노출 자리에서 밀리고 CPC도 비싸집니다. 광고
          소재 문구를 키워드와 더 일치시키거나, 랜딩페이지 관련성을 높이면 점수가 오를 수 있습니다.
        </Typography>
      </Stack>
    );
  })() : null;

  return (
    <MetricPageTemplate
      emoji="⭐"
      title="품질지수"
      englishName="Quality Score"
      oneLineDef="네이버가 매기는 광고의 품질 점수 (0~6점)"
      formula="품질지수 = 키워드-광고-랜딩페이지 관련성 + 예상 CTR + 광고 성과 종합 평가"
      whyImportant="품질지수는 같은 입찰가로 어느 자리에 노출될지를 결정하는 숨은 지표입니다. 품질지수가 6점이면 입찰가 100원만 써도 1위 노출이 가능하지만, 1점이면 1,000원 써도 밀릴 수 있습니다. CPC를 낮추는 가장 안전한 방법은 입찰가 인하가 아니라 품질지수 개선입니다."
      benchmarks={[
        { range: '6점', label: '매우 우수. 가장 효율적', color: 'info' },
        { range: '5점', label: '우수', color: 'success' },
        { range: '3 ~ 4점', label: '평균', color: 'warning' },
        { range: '0 ~ 2점', label: '낮음. 개선 필요', color: 'error' },
      ]}
      pitfalls={[
        '품질지수가 표시되지 않는 소재(0)는 노출이 거의 없거나 신규 등록 상태일 수 있습니다.',
        '품질지수는 키워드 단위로 측정됩니다. 같은 소재라도 키워드별로 점수가 다를 수 있음.',
        '품질지수만 올린다고 매출이 늘지는 않습니다. 어디까지나 같은 비용으로 더 좋은 자리를 받는 효율 지표.',
      ]}
      chart={chart}
      insights={insights}
    />
  );
}
