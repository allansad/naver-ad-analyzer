import { Typography, Stack } from '@mui/material';
import { MetricPageTemplate } from '../../components/MetricPageTemplate';
import { MetricBarChart } from '../../components/charts/MetricBarChart';
import { useData } from '../../context/DataContext';
import { formatWon } from '../../utils/format';
import { categoryColors } from '../../utils/classify';

export function CPAPage() {
  const { report } = useData();

  const chart = report ? (
    <MetricBarChart
      data={report.items
        .filter((it) => it.conversions > 0 && it.cost >= 1000)
        .map((it) => ({
          title: it.title,
          value: it.cpa,
          color: categoryColors[it.bigCategory] ?? '#3b82f6',
        }))}
      valueLabel="CPA"
      formatValue={(v) => formatWon(v)}
      averageLine={
        report.totals.cpa > 0 ? { value: report.totals.cpa, label: '전체 평균' } : undefined
      }
      topN={20}
    />
  ) : null;

  const insights = report ? (
    <Stack spacing={1}>
      <Typography variant="body2">
        평균 CPA: <strong>{formatWon(report.totals.cpa)}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        CPA가 평균보다 훨씬 높은 소재는 광고비를 비효율적으로 쓰고 있을 가능성이 높습니다. 다만
        객단가가 다른 소재끼리 비교하면 안 됩니다. (1만원 상품 CPA 5천원과 100만원 상품 CPA 5만원 중
        후자가 효율 좋음)
      </Typography>
    </Stack>
  ) : null;

  return (
    <MetricPageTemplate
      emoji="🎫"
      title="전환당 비용 (CPA)"
      englishName="Cost Per Acquisition"
      oneLineDef="전환 1건을 만들기 위해 광고비를 얼마 썼는지"
      formula="CPA(원) = 광고비 ÷ 전환수"
      whyImportant="CPA는 '한 명의 고객을 데려오는 데 드는 비용'입니다. CPA가 객단가보다 낮아야 광고가 흑자입니다. 예: 객단가 5만원인 상품에 CPA 6만원이면 팔 때마다 1만원씩 손해. 즉 광고를 켜면 켤수록 적자입니다."
      benchmarks={[
        { range: 'CPA < 객단가의 30%', label: '매우 효율적', color: 'success' },
        { range: 'CPA = 객단가의 30~50%', label: '양호', color: 'success' },
        { range: 'CPA = 객단가의 50~80%', label: '주의. 마진율 점검 필요', color: 'warning' },
        { range: 'CPA > 객단가', label: '적자. 즉시 점검', color: 'error' },
      ]}
      pitfalls={[
        '"전환"에 결제 외 행동(회원가입 등)이 섞여있으면 CPA가 실제보다 낮게 보입니다. "구매완료 CPA"를 별도로 계산해보세요.',
        'CPA는 객단가에 따라 상대적입니다. 절대값만 보고 좋다/나쁘다 판단하면 안 됩니다.',
        'CPA를 줄이는 데만 집중하면 매출 자체가 줄어들 수 있습니다. ROAS와 함께 보세요.',
      ]}
      chart={chart}
      insights={insights}
    />
  );
}
