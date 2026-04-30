import { Typography, Stack } from '@mui/material';
import { MetricPageTemplate } from '../../components/MetricPageTemplate';
import { MetricBarChart } from '../../components/charts/MetricBarChart';
import { useData } from '../../context/DataContext';
import { formatWon } from '../../utils/format';
import { categoryColors } from '../../utils/classify';

export function CPCPage() {
  const { report } = useData();

  const chart = report ? (
    <MetricBarChart
      data={report.items
        .filter((it) => it.clicks > 0)
        .map((it) => ({
          title: it.title,
          value: it.cpc,
          color: categoryColors[it.bigCategory] ?? '#3b82f6',
        }))}
      valueLabel="평균 CPC"
      formatValue={(v) => formatWon(v)}
      averageLine={
        report.totals.cpc > 0 ? { value: report.totals.cpc, label: '전체 평균' } : undefined
      }
      topN={20}
    />
  ) : null;

  const insights = report ? (
    <Stack spacing={1}>
      <Typography variant="body2">
        평균 CPC: <strong>{formatWon(report.totals.cpc)}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        같은 키워드 그룹에서 CPC가 평균보다 매우 높은 소재가 있다면, 입찰가를 너무 높게 설정했거나
        품질지수가 낮아 실제 비용이 비싸진 것일 수 있습니다.
      </Typography>
    </Stack>
  ) : null;

  return (
    <MetricPageTemplate
      emoji="💵"
      title="클릭당 비용 (CPC)"
      englishName="Cost Per Click"
      oneLineDef="클릭 1회를 받기 위해 광고비를 얼마 썼는지"
      formula="CPC(원) = 광고비 ÷ 클릭수"
      whyImportant="네이버 검색광고는 클릭이 발생할 때만 과금되는 'CPC 광고' 방식입니다. CPC가 낮을수록 같은 예산으로 더 많은 사람을 사이트로 데려올 수 있습니다. CPC는 입찰가, 경쟁자 수, 품질지수에 따라 결정됩니다."
      benchmarks={[
        { range: '~100원', label: '매우 저렴. 일반적이지 않은 키워드(브랜드/롱테일)', color: 'success' },
        { range: '100 ~ 500원', label: '평균 범위', color: 'success' },
        { range: '500 ~ 2,000원', label: '경쟁이 있는 키워드', color: 'warning' },
        { range: '2,000원 이상', label: '인기 키워드. ROAS가 받쳐줘야 정당화 가능', color: 'error' },
      ]}
      pitfalls={[
        'CPC가 낮다고 무조건 좋은 게 아닙니다. CPC 100원이라도 전환이 0이면 무의미합니다.',
        '입찰가를 무작정 낮추면 노출 자리가 떨어져서 클릭 자체를 못 받게 됩니다.',
        '품질지수를 올리면 같은 입찰가로도 CPC가 낮아집니다. 광고 소재 개선이 입찰가 인상보다 효율적일 수 있습니다.',
      ]}
      chart={chart}
      insights={insights}
    />
  );
}
