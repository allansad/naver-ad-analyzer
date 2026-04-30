import { Typography, Stack } from '@mui/material';
import { MetricPageTemplate } from '../../components/MetricPageTemplate';
import { HistogramChart } from '../../components/charts/HistogramChart';
import { useData } from '../../context/DataContext';
import { formatPct } from '../../utils/format';

export function CVRPage() {
  const { report } = useData();

  const chart = report ? (() => {
    const buckets = [
      { label: '0% (전환 0)', count: 0, color: '#94a3b8' },
      { label: '~5%', count: 0, color: '#ef4444' },
      { label: '5~10%', count: 0, color: '#f59e0b' },
      { label: '10~20%', count: 0, color: '#10b981' },
      { label: '20~50%', count: 0, color: '#10b981' },
      { label: '50%+', count: 0, color: '#3b82f6' },
    ];
    report.items
      .filter((it) => it.clicks > 0)
      .forEach((it) => {
        if (it.cvr === 0) buckets[0].count++;
        else if (it.cvr < 5) buckets[1].count++;
        else if (it.cvr < 10) buckets[2].count++;
        else if (it.cvr < 20) buckets[3].count++;
        else if (it.cvr < 50) buckets[4].count++;
        else buckets[5].count++;
      });
    return (
      <HistogramChart
        data={buckets}
        xLabel="CVR 구간 (%)"
        caption="클릭이 1회 이상 발생한 소재의 CVR 분포"
      />
    );
  })() : null;

  const insights = report ? (() => {
    const totalCvr = (report.totals.conversions / report.totals.clicks) * 100;
    return (
      <Stack spacing={1}>
        <Typography variant="body2">
          평균 CVR: <strong>{formatPct(totalCvr)}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {totalCvr >= 10
            ? 'CVR이 좋은 편입니다. 들어온 사용자가 잘 행동하고 있다는 의미. 이런 트래픽을 더 많이 가져오는 게 다음 액션입니다.'
            : totalCvr >= 3
              ? 'CVR이 평균 수준입니다. 랜딩페이지 개선으로 더 끌어올릴 여지가 있습니다.'
              : 'CVR이 낮습니다. 클릭이 들어와도 전환되지 않는다면 랜딩페이지, 상품 가격, 결제 흐름을 점검하세요.'}
        </Typography>
      </Stack>
    );
  })() : null;

  return (
    <MetricPageTemplate
      emoji="🎯"
      title="전환율 (CVR)"
      englishName="Conversion Rate"
      oneLineDef="클릭한 사람 중 몇 %가 전환했는지"
      formula="CVR(%) = 전환수 ÷ 클릭수 × 100"
      whyImportant="CTR이 '광고가 매력적인가'를 본다면, CVR은 '랜딩페이지/상품이 매력적인가'를 봅니다. 클릭을 받아놓고 전환이 안 되면 광고비만 쓰고 매출은 안 나옵니다. CVR은 광고가 끝난 다음 시작되는, 사이트 단계의 효율 지표입니다."
      benchmarks={[
        { range: '~3%', label: '낮음. 랜딩페이지 점검 필요', color: 'error' },
        { range: '3 ~ 5%', label: 'e-커머스 평균 수준', color: 'warning' },
        { range: '5 ~ 15%', label: '양호', color: 'success' },
        { range: '15% 이상', label: '우수. 진성 트래픽이 잘 들어오고 있음', color: 'info' },
      ]}
      pitfalls={[
        '"전환"의 정의가 무엇인지 먼저 확인하세요. 단순 회원가입을 전환으로 잡으면 CVR이 높아 보이지만 매출과 무관할 수 있습니다.',
        'CVR이 너무 높으면(50%+) 보통 매우 작은 클릭 수에서 우연히 나오는 값일 수 있습니다. 통계적 신뢰도가 낮음.',
        '카테고리/상품 가격대에 따라 CVR 기준이 다릅니다. 1만원 상품과 100만원 상품의 CVR을 같이 비교하면 안 됩니다.',
      ]}
      chart={chart}
      insights={insights}
    />
  );
}
