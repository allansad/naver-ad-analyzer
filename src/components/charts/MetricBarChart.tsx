import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { shortenTitle } from '../../utils/format';

export interface BarDatum {
  title: string;
  value: number;
  color?: string;
}

interface Props {
  data: BarDatum[];
  valueLabel: string;
  height?: number;
  formatValue?: (v: number) => string;
  averageLine?: { value: number; label: string };
  topN?: number;
}

export function MetricBarChart({
  data,
  valueLabel,
  height = 360,
  formatValue,
  averageLine,
  topN = 20,
}: Props) {
  const sliced = [...data].sort((a, b) => b.value - a.value).slice(0, topN);
  const display = sliced.map((d) => ({ ...d, displayName: shortenTitle(d.title, 22) }));

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        상위 {Math.min(topN, sliced.length)}개 표시 · 마우스를 막대 위에 올리면 전체 이름이 보입니다
      </Typography>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={display} margin={{ top: 12, right: 24, bottom: 80, left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="displayName"
            tick={{ fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => (formatValue ? formatValue(v) : String(v))}
          />
          <Tooltip
            formatter={(value) => {
              const v = typeof value === 'number' ? value : Number(value);
              return [formatValue ? formatValue(v) : v.toLocaleString('ko-KR'), valueLabel];
            }}
            labelFormatter={(_label, payload) => {
              const d = payload?.[0]?.payload;
              return d?.title ?? '';
            }}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          {averageLine && (
            <ReferenceLine
              y={averageLine.value}
              stroke="#ef4444"
              strokeDasharray="4 4"
              label={{
                value: averageLine.label,
                fill: '#ef4444',
                fontSize: 11,
                position: 'right',
              }}
            />
          )}
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {display.map((d, i) => (
              <Cell key={i} fill={d.color || '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
