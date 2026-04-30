import { Box, Typography, Paper, Stack, Chip } from '@mui/material';
import type { ReactNode } from 'react';

export function BeyondMetricsPage() {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1 }}>
        🧭 지표를 넘어서
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        지표 학습이 끝났다면, 마지막으로 마케터가 가져야 할 사고법을 정리합니다. 이 페이지는
        차트가 없습니다. 데이터 너머의 관점이기 때문입니다.
      </Typography>

      <Section>
        <Quote
          text="측정 지표가 목표가 되는 순간, 그것은 더 이상 좋은 지표가 아니다."
          author="굿하트의 법칙 (Goodhart's Law)"
        />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8 }}>
          영국 경제학자 찰스 굿하트가 1975년 제시한 법칙입니다. 어떤 지표를 KPI로 삼는 순간 사람들은
          그 지표를 끌어올리는 데 집착하기 시작하고, 결국 그 지표가 측정하려던 본래의 의미를
          잃어버립니다. 마케팅에서 가장 흔히 일어나는 일입니다.
        </Typography>
      </Section>

      <Section title="단일 지표 KPI의 함정">
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          모든 단일 지표는 그 지표를 극단적으로 추구하면 다른 곳에서 무너집니다.
        </Typography>
        <Stack spacing={1.5}>
          <Trap kpi="ROAS만" trap="적자 안 나는 광고만 남기다 절대 매출 폭락. 매출 견인 소재까지 끄게 됨" />
          <Trap kpi="CTR만" trap="자극적 카피로 클릭은 늘어도 진성 사용자 X → CVR 폭락 → 결국 ROAS 그대로" />
          <Trap kpi="CPC만" trap="입찰가 깎다가 노출 자리 떨어져 클릭 자체를 못 받음 → 매출 ↓" />
          <Trap kpi="CVR만" trap="비율은 좋아도 절대 전환수 적어 사업 성장 X" />
          <Trap kpi="CPA만" trap="단기 효율은 좋지만 LTV 무시. 장기 성장 동력 X" />
          <Trap kpi="노출수만" trap="무관한 노출까지 환영 → 데이터 신호 흐려짐 → 알고리즘 학습 실패" />
        </Stack>
      </Section>

      <Section title="지표는 '결과'가 아니라 '균형'이다">
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          좋은 마케터는 한 지표를 끌어올릴 때 다른 지표가 어떻게 같이 움직이는지를 봅니다.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 1.2,
          }}
        >
          <Scenario
            color="#10b981"
            label="🟢🟢 진짜 성공"
            text="CTR ↑ + CVR 유지 + ROAS ↑ + 매출 ↑"
          />
          <Scenario
            color="#10b981"
            label="🟢 정제 효과"
            text="CTR ↓ + CVR ↑ + ROAS ↑ (무관한 노출 줄어들어 진성만 남음)"
          />
          <Scenario
            color="#f59e0b"
            label="🟡 의미 없음"
            text="CTR ↑ + CVR ↓ + ROAS 유지 (자극적 클릭만 늘어남)"
          />
          <Scenario
            color="#ef4444"
            label="🔴 사업 위축"
            text="ROAS ↑ + 매출 ↓ (효율 좋아 보이지만 광고비 줄여서 매출까지 줄어든 케이스)"
          />
        </Box>

        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: '#f8fafc',
            borderRadius: 1,
            border: '1px solid #e2e8f0',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              color: '#0f172a',
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            ROAS = (CTR × CVR × 객단가) ÷ CPC
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 1 }}
          >
            이 식의 균형이 깨지면 ROAS는 같아도 사업이 흔들립니다
          </Typography>
        </Box>
      </Section>

      <Section title="사업 단계에 따라 KPI 자체가 다르다">
        <Stack spacing={1.5}>
          <StageCard
            stage="신규 / 런칭기"
            color="#3b82f6"
            kpi="신규 확보 절대수"
            desc="ROAS 단기 적자도 OK. 사용자 풀 빠르게 쌓는 게 우선. 알고리즘 학습 시드 확보."
          />
          <StageCard
            stage="성장기"
            color="#8b5cf6"
            kpi="트래픽 + 매출"
            desc="ROAS 균형 영역(300~500%). 매출 키우면서 효율도 챙기기 시작."
          />
          <StageCard
            stage="성숙기"
            color="#10b981"
            kpi="ROAS + 재구매율"
            desc="신규 확보 비용 ↑ 한계. 기존 고객 LTV 끌어올리기 + 효율 극대화."
          />
        </Stack>
      </Section>

      <Section>
        <Quote
          text="좋은 마케터는 지표를 만드는 사람이 아니라, 지표 너머의 사업을 읽는 사람이다."
          author="(이 도구의 핵심 메시지)"
        />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.8 }}>
          지표는 사업의 신호등입니다. 신호등의 색깔(빨강/노랑/초록)을 보는 게 아니라, 그 너머의
          도로 상황을 읽어야 합니다. "왜 이 지표가 이렇게 움직였나", "이게 사업적으로 무엇을
          의미하나", "다음 한 달 어떤 변화가 예상되나" — 이런 질문이 마케팅 실무자와 마케팅
          전략가를 가르는 차이입니다.
        </Typography>
      </Section>

      <Section title="이 도구가 끝나는 지점, 마케터가 시작되는 지점">
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
          이 도구는 지표를 분해해서 보여주지만, <strong>지표 간의 균형과 사업 맥락은 보여주지
          않습니다.</strong> 그건 도구의 한계가 아니라 마케터의 영역입니다. 같은 ROAS 489%여도
          매출 견인 소재라면 유지가 맞고, 작은 니치 상품이라면 낮은 거예요. 같은 CTR 0.15%여도
          매체 노출 위치가 무관해서 낮은 거라면 노출 정제가 답이고, 광고 자체가 매력 없어서라면
          소재 개선이 답입니다.
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 2, color: 'text.secondary', lineHeight: 1.9 }}
        >
          데이터를 정확하게 보는 능력 + 데이터 너머의 사업을 읽는 능력 + 가설을 세우고 시도하는
          용기 — 이 셋이 모이면 마케터가 됩니다. 이 도구는 첫 번째까지만 도와드릴 수 있습니다.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
          <KeywordChip>데이터 해석</KeywordChip>
          <KeywordChip>사업 맥락</KeywordChip>
          <KeywordChip>가설과 검증</KeywordChip>
          <KeywordChip>균형 감각</KeywordChip>
        </Stack>
      </Section>

      <Box
        sx={{
          mt: 6,
          py: 4,
          textAlign: 'center',
          color: 'text.secondary',
          fontStyle: 'italic',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <Typography variant="body2">
          좋은 마케터가 되는 길은 데이터를 외우는 게 아니라, 사업과 사용자를 이해하는
          데에서 시작됩니다.
        </Typography>
      </Box>
    </Box>
  );
}

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
      )}
      <Paper sx={{ p: 3 }}>{children}</Paper>
    </Box>
  );
}

function Quote({ text, author }: { text: string; author: string }) {
  return (
    <Box
      sx={{
        borderLeft: '4px solid #3b82f6',
        pl: 3,
        py: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.6,
          color: '#0f172a',
          mb: 1,
        }}
      >
        "{text}"
      </Typography>
      <Typography variant="caption" sx={{ color: '#64748b' }}>
        — {author}
      </Typography>
    </Box>
  );
}

function Trap({ kpi, trap }: { kpi: string; trap: string }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="flex-start"
      sx={{
        p: 1.5,
        bgcolor: '#fef2f2',
        borderRadius: 1,
        border: '1px solid #fecaca',
      }}
    >
      <Chip
        label={kpi}
        size="small"
        sx={{
          bgcolor: '#fee2e2',
          color: '#991b1b',
          fontWeight: 600,
          minWidth: 80,
          flexShrink: 0,
        }}
      />
      <Typography variant="body2" sx={{ color: '#7f1d1d', lineHeight: 1.6 }}>
        {trap}
      </Typography>
    </Stack>
  );
}

function Scenario({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: '#f8fafc',
        borderRadius: 1,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 700, color, display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: '#0f172a', fontFamily: 'ui-monospace, monospace', fontSize: 12 }}>
        {text}
      </Typography>
    </Box>
  );
}

function StageCard({
  stage,
  color,
  kpi,
  desc,
}: {
  stage: string;
  color: string;
  kpi: string;
  desc: string;
}) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: '#f8fafc',
        borderRadius: 1,
        border: '1px solid #e2e8f0',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: color,
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
          {stage}
        </Typography>
        <Chip
          label={`핵심 KPI: ${kpi}`}
          size="small"
          sx={{ bgcolor: color + '20', color, fontWeight: 600, fontSize: 11 }}
        />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ ml: 2.5, fontSize: 13 }}>
        {desc}
      </Typography>
    </Box>
  );
}

function KeywordChip({ children }: { children: ReactNode }) {
  return (
    <Chip
      label={children}
      size="small"
      sx={{
        bgcolor: '#f1f5f9',
        color: '#0f172a',
        fontWeight: 600,
        fontSize: 12,
      }}
    />
  );
}
