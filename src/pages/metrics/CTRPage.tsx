import { Typography, Stack } from '@mui/material';
import { MetricPageTemplate } from '../../components/MetricPageTemplate';
import { HistogramChart } from '../../components/charts/HistogramChart';
import { useData } from '../../context/DataContext';
import { formatPct } from '../../utils/format';

export function CTRPage() {
  const { report } = useData();

  const chart = report ? (() => {
    const buckets = [
      { label: '0% (클릭 0)', count: 0, color: '#94a3b8' },
      { label: '~0.5%', count: 0, color: '#ef4444' },
      { label: '0.5~1%', count: 0, color: '#f59e0b' },
      { label: '1~2%', count: 0, color: '#10b981' },
      { label: '2~5%', count: 0, color: '#10b981' },
      { label: '5%+', count: 0, color: '#3b82f6' },
    ];
    report.items
      .filter((it) => it.impressions > 0)
      .forEach((it) => {
        if (it.ctr === 0) buckets[0].count++;
        else if (it.ctr < 0.5) buckets[1].count++;
        else if (it.ctr < 1) buckets[2].count++;
        else if (it.ctr < 2) buckets[3].count++;
        else if (it.ctr < 5) buckets[4].count++;
        else buckets[5].count++;
      });
    return (
      <HistogramChart
        data={buckets}
        xLabel="CTR 구간 (%)"
        caption="노출이 1회 이상 발생한 소재의 CTR 분포"
      />
    );
  })() : null;

  const insights = report ? (() => {
    const totalCtr = (report.totals.clicks / report.totals.impressions) * 100;
    return (
      <Stack spacing={1}>
        <Typography variant="body2">
          전체 평균 CTR: <strong>{formatPct(totalCtr)}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {totalCtr < 0.5
            ? '평균 CTR이 0.5% 미만으로 매우 낮습니다. 콘텐츠 매체나 광범위 키워드 매칭 때문에 무관한 노출이 많을 가능성이 큽니다.'
            : totalCtr < 1
              ? 'CTR이 평균 이하입니다. 광고 소재(이미지/문구)를 개선하거나 키워드 매칭 범위를 좁힐 여지가 있습니다.'
              : 'CTR이 정상 범위입니다. 하지만 개별 소재 단위로 보면 차이가 클 수 있으니 분포를 살펴보세요.'}
        </Typography>
      </Stack>
    );
  })() : null;

  return (
    <MetricPageTemplate
      emoji="👆"
      title="클릭률 (CTR)"
      englishName="Click Through Rate"
      oneLineDef="광고를 본 사람 중 몇 %가 클릭했는지"
      formula="CTR(%) = 클릭수 ÷ 노출수 × 100"
      whyImportant="CTR은 '광고가 얼마나 매력적인가'를 나타냅니다. 같은 노출이라도 CTR이 2배면 클릭이 2배입니다. 또 네이버는 CTR이 높은 광고에 가산점을 주기 때문에(품질지수↑), CTR이 좋으면 같은 입찰가로도 더 좋은 자리에 노출됩니다."
      benchmarks={[
        { range: '~0.5%', label: '매우 낮음. 광고 소재나 키워드 매칭에 문제가 있을 가능성', color: 'error' },
        { range: '0.5 ~ 1%', label: '낮음. 개선 여지 있음', color: 'warning' },
        { range: '1 ~ 3%', label: '검색광고 정상 범위', color: 'success' },
        { range: '3% 이상', label: '우수. 매력적인 광고', color: 'info' },
      ]}
      pitfalls={[
        '검색광고와 디스플레이/배너 광고의 CTR 기준은 다릅니다. 디스플레이는 0.1%만 되어도 양호한 편.',
        'CTR이 너무 높은데 전환이 없다면, 광고 문구가 과장되어 사람을 끌어들이지만 실제 상품과 미스매치일 수 있습니다.',
        'PC와 모바일 CTR은 보통 비슷하거나 모바일이 더 높습니다. 모바일이 PC보다 훨씬 낮으면 콘텐츠 매체 노출 비중을 의심하세요.',
      ]}
      chart={chart}
      insights={insights}
    />
  );
}
