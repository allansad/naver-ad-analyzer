import { Typography, Stack, Paper, Box } from '@mui/material';
import { MetricPageTemplate } from '../../components/MetricPageTemplate';
import { ScatterChartView } from '../../components/charts/ScatterChart';
import { useData } from '../../context/DataContext';
import { formatPct, formatWon } from '../../utils/format';
import { categoryColors } from '../../utils/classify';
import type { AdItem } from '../../types';

const NOISE_FLOOR = 1000;

export function ROASPage() {
  const { report } = useData();

  const chart = report ? (() => {
    const grouped: Record<string, { x: number; y: number; title: string; revenue: number }[]> = {};
    report.items
      .filter((it) => it.cost >= NOISE_FLOOR)
      .forEach((it: AdItem) => {
        const cat = it.bigCategory;
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({
          x: it.cost,
          y: it.roas,
          title: it.title,
          revenue: it.revenue,
        });
      });
    const groups = Object.entries(grouped).map(([cat, points]) => ({
      name: cat,
      color: categoryColors[cat] ?? '#94a3b8',
      points,
    }));
    return (
      <Box>
        <ScatterChartView
          groups={groups}
          caption={`X축은 광고비, Y축은 ROAS · 광고비 ${NOISE_FLOOR.toLocaleString()}원 미만 소재는 변동성이 커서 제외했습니다`}
        />
        <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <Quadrant
            color="#10b981"
            title="🚀 오른쪽 위"
            desc="비용 크고 효율 좋음 — 캠페인 주력. 유지"
          />
          <Quadrant
            color="#3b82f6"
            title="💎 왼쪽 위"
            desc="비용 적은데 효율 최고 — 입찰가 올려서 키우기"
          />
          <Quadrant
            color="#ef4444"
            title="💸 오른쪽 아래"
            desc="비용만 많이 쓰는 소재 — 입찰가 낮추거나 OFF"
          />
          <Quadrant
            color="#94a3b8"
            title="⚠️ 왼쪽 아래"
            desc="비용도 적고 효율도 낮음 — 일단 관찰"
          />
        </Box>
      </Box>
    );
  })() : null;

  const insights = report ? (
    <Stack spacing={1.5}>
      <Typography variant="body2">
        총 광고비: <strong>{formatWon(report.totals.cost)}</strong> · 총 매출:{' '}
        <strong>{formatWon(report.totals.revenue)}</strong>
      </Typography>
      <Typography variant="body2">
        총 ROAS: <strong>{formatPct(report.totals.roas)}</strong> (광고비 1원당 매출{' '}
        {(report.totals.roas / 100).toFixed(1)}원)
      </Typography>
      {report.totals.purchaseRev > 0 && (
        <Typography variant="body2" color="text.secondary">
          구매완료 기준 ROAS:{' '}
          <strong>
            {formatPct((report.totals.purchaseRev / report.totals.cost) * 100)}
          </strong>
          {' — '}이게 진짜 매출 기준 ROAS입니다. "총 ROAS"는 회원가입 등 마이크로 전환 가치까지 포함된
          값이라 부풀려진 측면이 있습니다.
        </Typography>
      )}
    </Stack>
  ) : null;

  return (
    <MetricPageTemplate
      emoji="💰"
      title="광고수익률 (ROAS) ★"
      englishName="Return On Ad Spend"
      oneLineDef="광고비 1원당 매출이 얼마나 발생했는가 — 마케터가 가장 먼저 봐야 하는 지표"
      formula="ROAS(%) = 매출 ÷ 광고비 × 100"
      whyImportant="ROAS는 '이 광고가 돈을 벌고 있는가'라는 가장 본질적인 질문에 답하는 지표입니다. ROAS 100% 미만이면 광고비보다 매출이 적다는 뜻 — 즉 적자. ROAS만 높다고 무조건 좋은 것도 아닙니다(절대 매출이 작을 수 있음). 그래도 다른 모든 지표가 흔들려도 ROAS 하나만 정확히 보면 큰 그림은 잡힙니다."
      benchmarks={[
        { range: '~100%', label: '적자. 광고를 켤수록 손해', color: 'error' },
        { range: '100 ~ 300%', label: '마진율에 따라 손익 갈림', color: 'warning' },
        { range: '300 ~ 1,000%', label: '안전 영역', color: 'success' },
        { range: '1,000% 이상', label: '매우 우수', color: 'info' },
      ]}
      pitfalls={[
        '"총 ROAS"는 마이크로 전환(장바구니, 회원가입)의 추정 가치까지 포함되어 부풀려질 수 있습니다. 진짜 매출은 "구매완료 ROAS"로 보세요.',
        'ROAS가 매우 높은데(예: 5,000%+) 광고비가 작다면, 한두 건의 큰 주문으로 우연히 부풀려진 값일 수 있습니다. 통계적 신뢰도가 낮음.',
        'ROAS 1,000%로 매출 100만원 vs ROAS 200%로 매출 1억. 어느 쪽이 좋을까요? 사업 단계에 따라 답이 다릅니다.',
        '마진율을 모르면 ROAS만으로 흑자/적자 판단이 어렵습니다. 마진 30%면 ROAS 333% 미만은 적자.',
      ]}
      chart={chart}
      insights={insights}
    />
  );
}

function Quadrant({ color, title, desc }: { color: string; title: string; desc: string }) {
  return (
    <Paper sx={{ p: 1.5 }}>
      <Typography variant="caption" sx={{ fontWeight: 700, color, display: 'block' }}>
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
        {desc}
      </Typography>
    </Paper>
  );
}
