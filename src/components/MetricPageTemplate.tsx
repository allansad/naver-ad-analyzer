import { Box, Typography, Paper, Stack, Chip, Alert, type AlertColor } from '@mui/material';
import type { ReactNode } from 'react';
import { NoDataPrompt } from './NoDataPrompt';
import { useData } from '../context/DataContext';

export interface BenchmarkRow {
  range: string;
  label: string;
  color: 'success' | 'warning' | 'error' | 'default' | 'info';
}

interface Props {
  emoji: string;
  title: string;
  englishName: string;
  oneLineDef: string;
  formula: string;
  whyImportant: string;
  benchmarks?: BenchmarkRow[];
  pitfalls?: string[];
  chart: ReactNode;
  insights?: ReactNode;
  requiresData?: boolean;
}

export function MetricPageTemplate({
  emoji,
  title,
  englishName,
  oneLineDef,
  formula,
  whyImportant,
  benchmarks,
  pitfalls,
  chart,
  insights,
  requiresData = true,
}: Props) {
  const { report } = useData();

  return (
    <Box>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h1" sx={{ fontSize: '2.25rem' }}>
          {emoji}
        </Typography>
        <Box>
          <Typography variant="h1" sx={{ fontSize: '1.75rem', mb: 0 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {englishName}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 400, mb: 4, fontSize: 16 }}>
        {oneLineDef}
      </Typography>

      <Section title="📐 공식">
        <Box
          sx={{
            bgcolor: '#0f172a',
            color: '#e2e8f0',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            px: 3,
            py: 2,
            borderRadius: 1.5,
            fontSize: 15,
          }}
        >
          {formula}
        </Box>
      </Section>

      <Section title="💡 왜 중요한가">
        <Typography>{whyImportant}</Typography>
      </Section>

      {benchmarks && benchmarks.length > 0 && (
        <Section title="📏 어느 정도가 좋은 값인가">
          <Stack spacing={1}>
            {benchmarks.map((b, i) => (
              <Stack
                key={i}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  p: 1.5,
                  bgcolor: '#f8fafc',
                  borderRadius: 1,
                  border: '1px solid #e2e8f0',
                }}
              >
                <Chip
                  label={b.range}
                  color={b.color === 'default' ? undefined : b.color}
                  variant={b.color === 'default' ? 'outlined' : 'filled'}
                  size="small"
                  sx={{ minWidth: 110, fontWeight: 600 }}
                />
                <Typography variant="body2">{b.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Section>
      )}

      <Section title="📊 내 데이터로 보기">
        {!report && requiresData ? <NoDataPrompt /> : chart}
      </Section>

      {insights && report && <Section title="🔍 이 데이터에서 읽히는 것">{insights}</Section>}

      {pitfalls && pitfalls.length > 0 && (
        <Section title="⚠️ 흔히 하는 실수 / 함정">
          <Stack spacing={1}>
            {pitfalls.map((p, i) => (
              <Alert
                key={i}
                severity={'warning' as AlertColor}
                icon={false}
                sx={{ bgcolor: '#fef3c7', color: '#78350f', border: '1px solid #fde68a' }}
              >
                {p}
              </Alert>
            ))}
          </Stack>
        </Section>
      )}
    </Box>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <Paper sx={{ p: 3 }}>{children}</Paper>
    </Box>
  );
}
