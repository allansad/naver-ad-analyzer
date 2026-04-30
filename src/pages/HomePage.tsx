import { Box, Typography, Paper, Stack, Chip } from '@mui/material';
import { FileUpload } from '../components/FileUpload';
import { useData } from '../context/DataContext';
import { formatWon, formatPct, formatNum } from '../utils/format';

export function HomePage() {
  const { report } = useData();

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1 }}>
        📚 광고 지표
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        네이버 광고주센터에서 다운로드한 "소재 목록" 엑셀 파일을 업로드하면, 지표별로 의미와 차트를
        함께 학습할 수 있습니다. 마케터 지망생을 위한 교육용 도구입니다.
      </Typography>

      <Paper sx={{ p: 4, mb: 4 }}>
        <FileUpload />
      </Paper>

      {report && (
        <Box>
          <Typography variant="h2" sx={{ mb: 1 }}>
            업로드된 데이터 요약
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            운영 가능 소재 {report.items.length}개 기준
            {report.inactiveItems.length > 0 &&
              ` · 중지/비정상 소재 ${report.inactiveItems.length}개는 분석에서 제외됨 (운영 점검 페이지에서 별도 확인)`}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
            <SummaryCard label="총 광고비" value={formatWon(report.totals.cost)} />
            <SummaryCard label="총 매출" value={formatWon(report.totals.revenue)} />
            <SummaryCard
              label="총 ROAS"
              value={formatPct(report.totals.roas)}
              hint={
                report.totals.roas >= 300
                  ? '안전 영역'
                  : report.totals.roas >= 100
                    ? '주의'
                    : '적자 위험'
              }
            />
            <SummaryCard label="총 노출수" value={formatNum(report.totals.impressions)} />
            <SummaryCard label="총 클릭수" value={formatNum(report.totals.clicks)} />
            <SummaryCard label="총 전환수" value={formatNum(report.totals.conversions) + '건'} />
            <SummaryCard label="운영 가능 소재" value={`${report.items.length}개`} />
          </Stack>
        </Box>
      )}

      <Paper sx={{ p: 3, bgcolor: '#f0f9ff', border: '1px solid #bae6fd' }}>
        <Typography variant="h4" sx={{ mb: 1, color: '#0c4a6e' }}>
          🧭 학습 순서 추천
        </Typography>
        <Typography variant="body2" sx={{ color: '#0c4a6e', mb: 2 }}>
          왼쪽 메뉴를 위에서 아래로 차례로 따라가면 됩니다. 마케팅 퍼널 순서로 정리되어 있습니다.
        </Typography>
        <Stack spacing={1}>
          <FlowItem step="1" text="마케팅 퍼널 개관에서 전체 흐름 잡기" />
          <FlowItem step="2" text="노출수 → 클릭수/CTR/CPC → 전환수/CVR/CPA → 매출/ROAS 순서로 학습" />
          <FlowItem step="3" text="ROAS는 가장 중요한 지표이므로 마지막에 깊게 보기" />
          <FlowItem step="4" text="실전 분석 페이지에서 지금까지 배운 지표를 종합해서 본다" />
          <FlowItem step="5" text="마지막으로 '지표를 넘어서'에서 마케터의 사고법 정리" />
        </Stack>
      </Paper>

      <Paper
        sx={{
          mt: 3,
          p: 3,
          bgcolor: '#0f172a',
          border: 'none',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#f1f5f9',
            fontStyle: 'italic',
            fontWeight: 500,
            lineHeight: 1.6,
            mb: 1.5,
          }}
        >
          "측정 지표가 목표가 되는 순간, 그것은 더 이상 좋은 지표가 아니다."
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 2 }}>
          — 굿하트의 법칙 (Goodhart's Law)
        </Typography>
        <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.7 }}>
          이 도구는 지표를 정확하게 보는 법을 알려드립니다. 하지만 어떤 지표든 한 가지만 쫓으면
          반드시 다른 곳에서 무너집니다. 좋은 마케터는 지표를 끌어올리는 사람이 아니라, 지표 너머의
          사업을 읽는 사람입니다.
        </Typography>
      </Paper>
    </Box>
  );
}

function SummaryCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Paper sx={{ p: 2.5, minWidth: 180, flex: '1 1 180px' }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="h3" sx={{ fontSize: '1.4rem' }}>
        {value}
      </Typography>
      {hint && <Chip label={hint} size="small" sx={{ mt: 1, fontSize: 11 }} />}
    </Paper>
  );
}

function FlowItem({ step, text }: { step: string; text: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: '#0369a1',
          color: 'white',
          fontSize: 12,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {step}
      </Box>
      <Typography variant="body2" sx={{ color: '#0c4a6e' }}>
        {text}
      </Typography>
    </Stack>
  );
}
