import { Box, Typography, Paper, Stack, Chip, Alert } from '@mui/material';
import { FileUpload } from '../components/FileUpload';
import { FunnelChart } from '../components/charts/FunnelChart';
import { useData } from '../context/DataContext';
import { formatPct } from '../utils/format';

export function FunnelPage() {
  const { report } = useData();

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1 }}>
        🌪 마케팅 퍼널 개관
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        광고는 여러 단계를 거치며 사용자가 점점 줄어드는 깔때기(퍼널) 구조입니다. 각 단계에서 얼마나 줄어드는지를 보면, 어디에서 광고가 새고 있는지 알 수 있습니다.
      </Typography>

      <FileUpload compact />

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#f0f9ff', border: '1px solid #bae6fd' }}>
        <Typography variant="h4" sx={{ mb: 1, color: '#0c4a6e' }}>
          📚 퍼널 단계
        </Typography>
        <Stack spacing={1.2}>
          <Stage
            num="1"
            color="#3b82f6"
            stage="노출 (Impressions)"
            desc="광고가 사용자에게 보였다. 아직 클릭은 X"
            metric="노출수"
          />
          <Arrow rate="CTR (클릭률)" desc="얼마나 호기심을 끄는가" />
          <Stage
            num="2"
            color="#06b6d4"
            stage="클릭 (Clicks)"
            desc="사용자가 광고를 클릭해서 사이트에 들어왔다"
            metric="클릭수"
          />
          <Arrow rate="CVR (전환율)" desc="얼마나 행동으로 이어지는가" />
          <Stage
            num="3"
            color="#8b5cf6"
            stage="전환 (Conversions)"
            desc="회원가입, 장바구니, 구매 등 우리가 원하는 행동을 했다"
            metric="전환수"
          />
          <Arrow rate="구매 전환율" desc="진짜로 결제까지 가는가" />
          <Stage
            num="4"
            color="#10b981"
            stage="구매 (Purchase)"
            desc="실제 결제 완료. 진짜 매출"
            metric="구매완료 전환수, 매출액"
          />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          📊 내 데이터의 퍼널
        </Typography>
        {!report ? (
          <Alert severity="info">데이터를 업로드하면 실제 퍼널 차트가 보입니다.</Alert>
        ) : (
          <>
            <FunnelChart
              stages={[
                {
                  label: '노출',
                  value: report.totals.impressions,
                  color: '#3b82f6',
                  rateLabel: 'CTR',
                },
                {
                  label: '클릭',
                  value: report.totals.clicks,
                  color: '#06b6d4',
                  rateLabel: 'CTR',
                },
                {
                  label: '전환',
                  value: report.totals.conversions,
                  unit: '건',
                  color: '#8b5cf6',
                  rateLabel: 'CVR',
                },
                {
                  label: '구매완료',
                  value: report.totals.purchaseConv,
                  unit: '건',
                  color: '#10b981',
                  rateLabel: '구매 전환율',
                },
              ]}
            />
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>읽는 법</strong>: 각 단계에서 얼마나 사람이 줄어드는지 보세요.
                보통 노출 → 클릭에서 가장 많이 줄어들고(99% 이상), 클릭한 사람의 10~30% 정도가 전환합니다.
                전환과 구매완료의 차이도 중요합니다 — "총 전환"에는 장바구니 담기, 회원가입 같은
                마이크로 전환이 포함되지만, 진짜 매출은 "구매완료" 기준입니다.
              </Typography>
              {report.totals.clicks > 0 && (
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
                  <Chip
                    size="small"
                    label={`CTR: ${formatPct((report.totals.clicks / report.totals.impressions) * 100)}`}
                  />
                  <Chip
                    size="small"
                    label={`CVR: ${formatPct((report.totals.conversions / report.totals.clicks) * 100)}`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={`구매 전환율: ${formatPct(
                      report.totals.conversions > 0
                        ? (report.totals.purchaseConv / report.totals.conversions) * 100
                        : 0,
                    )}`}
                    color="success"
                    variant="outlined"
                  />
                </Stack>
              )}
            </Box>
          </>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          🔑 핵심 메시지
        </Typography>
        <Stack spacing={1.5}>
          <Bullet text="광고 효율을 높이려면 어느 단계에서 새는지부터 찾아야 합니다." />
          <Bullet text="노출이 많은데 클릭이 적다 → 광고 소재(이미지/문구)가 매력적이지 않다." />
          <Bullet text="클릭은 많은데 전환이 적다 → 랜딩페이지나 상품에 문제가 있다." />
          <Bullet text="전환은 많은데 구매완료가 적다 → 결제 단계에서 이탈이 일어난다." />
        </Stack>
      </Paper>
    </Box>
  );
}

function Stage({
  num,
  color,
  stage,
  desc,
  metric,
}: {
  num: string;
  color: string;
  stage: string;
  desc: string;
  metric: string;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: color,
          color: 'white',
          fontSize: 14,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {num}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {stage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Typography variant="caption" sx={{ color: '#0369a1' }}>
          관련 지표: {metric}
        </Typography>
      </Box>
    </Stack>
  );
}

function Arrow({ rate, desc }: { rate: string; desc: string }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ ml: 1.5 }}>
      <Box sx={{ width: 1, height: 24, bgcolor: '#cbd5e1', mr: 2 }} />
      <Typography variant="caption" color="text.secondary">
        ↓ <strong>{rate}</strong> · {desc}
      </Typography>
    </Stack>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <Stack direction="row" spacing={1}>
      <Box sx={{ color: '#3b82f6', fontWeight: 700 }}>•</Box>
      <Typography variant="body2">{text}</Typography>
    </Stack>
  );
}
