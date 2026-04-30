import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Alert,
} from '@mui/material';
import { FileUpload } from '../components/FileUpload';
import { useData } from '../context/DataContext';
import { formatPct, formatWon, formatNum } from '../utils/format';
import { classifyEfficiency, categoryColors } from '../utils/classify';
import type { AdItem } from '../types';

export function AnalysisPage() {
  const { report } = useData();

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1 }}>
        🧪 내 데이터 종합 분석
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        지표 학습이 끝나셨다면, 이제 실제 데이터에서 어떤 소재를 손봐야 하는지 확인할 차례입니다.
      </Typography>

      <FileUpload compact />

      {!report && (
        <Alert severity="info" sx={{ mb: 3 }}>
          데이터를 업로드하면 분석 결과가 보입니다.
        </Alert>
      )}

      {report && (
        <>
          <Section title="🔴 지금 손봐야 할 소재">
            <Caption>
              광고비 5,000원 이상 + ROAS 500% 미만 — 광고비를 많이 쓰는데 매출이 안 따라오는 소재입니다.
              입찰가를 낮추거나 OFF를 검토하세요.
            </Caption>
            <BadTable items={report.items} />
          </Section>

          <Section title="💎 비중 키울 소재">
            <Caption>
              광고비 1,000원 이상 + ROAS 1,000% 이상 — 효율 좋은데 광고비를 적게 쓰는 소재.
              입찰가를 올려서 노출을 늘릴 후보입니다.
            </Caption>
            <GoodTable items={report.items} />
          </Section>

          <Section title="⚠️ 운영 상태 점검">
            <Caption>OFF 또는 연동 비정상 상태인 소재. 의도된 OFF인지 확인하세요.</Caption>
            <StatusTable items={report.inactiveItems} />
          </Section>
        </>
      )}
    </Box>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <Paper sx={{ p: 3 }}>{children}</Paper>
    </Box>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        bgcolor: '#f0f9ff',
        borderLeft: '3px solid #3b82f6',
        p: 1.5,
        borderRadius: 0.5,
        mb: 2,
      }}
    >
      <Typography variant="body2" sx={{ color: '#0c4a6e' }}>
        {children}
      </Typography>
    </Box>
  );
}

function BadTable({ items }: { items: AdItem[] }) {
  const bad = items
    .filter((it) => it.cost >= 5000 && it.roas < 500)
    .sort((a, b) => b.cost - a.cost);

  if (bad.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
        손봐야 할 소재가 없습니다 👍
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>소재명</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell align="right">광고비</TableCell>
            <TableCell align="right">매출</TableCell>
            <TableCell align="right">ROAS</TableCell>
            <TableCell align="right">전환수</TableCell>
            <TableCell>판정</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bad.map((it, i) => {
            const eff = classifyEfficiency(it.roas, it.cost);
            return (
              <TableRow key={i} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ maxWidth: 320 }}>
                  <Typography variant="body2" sx={{ fontSize: 12 }}>
                    {it.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={it.bigCategory}
                    sx={{
                      bgcolor: categoryColors[it.bigCategory] + '20',
                      color: categoryColors[it.bigCategory],
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell align="right">{formatWon(it.cost)}</TableCell>
                <TableCell align="right">{formatWon(it.revenue)}</TableCell>
                <TableCell align="right">
                  <Typography sx={{ color: '#ef4444', fontWeight: 600, fontSize: 13 }}>
                    {formatPct(it.roas)}
                  </Typography>
                </TableCell>
                <TableCell align="right">{formatNum(it.conversions)}</TableCell>
                <TableCell>
                  <EfficiencyChip tag={eff.tag} label={eff.label} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function GoodTable({ items }: { items: AdItem[] }) {
  const good = items
    .filter((it) => it.cost >= 1000 && it.roas >= 1000)
    .sort((a, b) => b.roas - a.roas);

  if (good.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
        조건에 맞는 소재가 없습니다.
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>소재명</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell align="right">광고비</TableCell>
            <TableCell align="right">매출</TableCell>
            <TableCell align="right">ROAS</TableCell>
            <TableCell align="right">전환수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {good.map((it, i) => (
            <TableRow key={i} hover>
              <TableCell>{i + 1}</TableCell>
              <TableCell sx={{ maxWidth: 320 }}>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  {it.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={it.bigCategory}
                  sx={{
                    bgcolor: categoryColors[it.bigCategory] + '20',
                    color: categoryColors[it.bigCategory],
                    fontWeight: 600,
                  }}
                />
              </TableCell>
              <TableCell align="right">{formatWon(it.cost)}</TableCell>
              <TableCell align="right">{formatWon(it.revenue)}</TableCell>
              <TableCell align="right">
                <Typography sx={{ color: '#10b981', fontWeight: 600, fontSize: 13 }}>
                  {formatPct(it.roas)}
                </Typography>
              </TableCell>
              <TableCell align="right">{formatNum(it.conversions)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function StatusTable({ items }: { items: AdItem[] }) {
  // items는 이미 inactiveItems (운영 가능이 아닌 소재만)
  const issues = items;
  if (issues.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
        모든 소재가 정상 운영 중입니다 👍
      </Typography>
    );
  }
  return (
    <Stack spacing={1}>
      {issues.map((it, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            p: 1,
            border: '1px solid #fee2e2',
            borderRadius: 1,
            bgcolor: '#fef2f2',
          }}
        >
          <Chip size="small" color="error" label={it.status} sx={{ flexShrink: 0 }} />
          <Typography variant="body2" sx={{ fontSize: 12, flex: 1 }}>
            {it.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            노출 {formatNum(it.impressions)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function EfficiencyChip({ tag, label }: { tag: string; label: string }) {
  const colorMap: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
    success: 'success',
    warning: 'warning',
    danger: 'error',
    muted: 'default',
  };
  return <Chip size="small" color={colorMap[tag]} label={label} sx={{ fontSize: 11 }} />;
}
