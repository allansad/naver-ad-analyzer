import {
  ResponsiveContainer,
  ScatterChart as ReScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { formatWon, formatPct } from '../../utils/format';

export interface ScatterPoint {
  x: number;
  y: number;
  title: string;
  revenue: number;
}

interface Props {
  groups: { name: string; color: string; points: ScatterPoint[] }[];
  height?: number;
  caption?: string;
}

export function ScatterChartView({ groups, height = 480, caption }: Props) {
  return (
    <Box>
      {caption && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          {caption}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <ReScatterChart margin={{ top: 16, right: 24, bottom: 40, left: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            dataKey="x"
            name="광고비"
            tick={{ fontSize: 11 }}
            label={{ value: '광고비 (원)', position: 'insideBottom', offset: -16, fontSize: 12 }}
            tickFormatter={(v) => v.toLocaleString('ko-KR')}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="ROAS"
            tick={{ fontSize: 11 }}
            label={{ value: 'ROAS (%)', angle: -90, position: 'insideLeft', fontSize: 12 }}
            tickFormatter={(v) => v + '%'}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              const d = payload[0].payload as ScatterPoint;
              return (
                <Box
                  sx={{
                    bgcolor: '#0f172a',
                    color: 'white',
                    p: 1.5,
                    borderRadius: 1,
                    fontSize: 12,
                    maxWidth: 320,
                  }}
                >
                  <Box sx={{ fontWeight: 600, mb: 0.5 }}>
                    {d.title.length > 60 ? d.title.slice(0, 60) + '…' : d.title}
                  </Box>
                  <Box>광고비: {formatWon(d.x)}</Box>
                  <Box>ROAS: {formatPct(d.y)}</Box>
                  <Box>매출: {formatWon(d.revenue)}</Box>
                </Box>
              );
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {groups.map((g) => (
            <Scatter key={g.name} name={g.name} data={g.points} fill={g.color} />
          ))}
        </ReScatterChart>
      </ResponsiveContainer>
    </Box>
  );
}
