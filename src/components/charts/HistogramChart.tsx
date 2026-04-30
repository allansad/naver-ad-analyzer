import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Box, Typography } from '@mui/material';

export interface HistogramBucket {
  label: string;
  count: number;
  color?: string;
}

interface Props {
  data: HistogramBucket[];
  xLabel: string;
  yLabel?: string;
  height?: number;
  caption?: string;
}

export function HistogramChart({ data, xLabel, yLabel = '소재 수', height = 320, caption }: Props) {
  return (
    <Box>
      {caption && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          {caption}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 12, right: 24, bottom: 36, left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            label={{ value: xLabel, position: 'insideBottom', offset: -16, fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Tooltip
            formatter={(v) => [`${typeof v === 'number' ? v : Number(v)}개`, yLabel]}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color || '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
