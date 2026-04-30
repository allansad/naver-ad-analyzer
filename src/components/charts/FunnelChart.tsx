import { Box, Stack, Typography } from '@mui/material';
import { formatNum, formatPct } from '../../utils/format';

export interface FunnelStage {
  label: string;
  value: number;
  unit?: string;
  color: string;
  rateLabel?: string;
}

interface Props {
  stages: FunnelStage[];
}

export function FunnelChart({ stages }: Props) {
  if (stages.length === 0) return null;
  const max = stages[0].value;

  return (
    <Stack spacing={0.5}>
      {stages.map((s, i) => {
        const widthPct = max > 0 ? (s.value / max) * 100 : 0;
        const prev = i > 0 ? stages[i - 1].value : null;
        const conversionRate = prev !== null && prev > 0 ? (s.value / prev) * 100 : null;
        return (
          <Box key={s.label}>
            <Stack direction="row" alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 100 }}>
                {s.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {formatNum(s.value)}
                {s.unit ? s.unit : ''}
              </Typography>
              {conversionRate !== null && (
                <Typography
                  variant="caption"
                  sx={{ ml: 'auto', color: '#64748b' }}
                >
                  ↓ {formatPct(conversionRate, 2)} ({s.rateLabel ?? '전 단계 대비'})
                </Typography>
              )}
            </Stack>
            <Box sx={{ position: 'relative', height: 36, bgcolor: '#f1f5f9', borderRadius: 1 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${widthPct}%`,
                  bgcolor: s.color,
                  borderRadius: 1,
                  transition: 'width 0.4s ease',
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
