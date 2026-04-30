import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  caption?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const groups: NavGroup[] = [
  {
    title: '시작하기',
    items: [
      { to: '/', label: '홈 / 데이터 업로드' },
      { to: '/funnel', label: '마케팅 퍼널 개관' },
    ],
  },
  {
    title: '노출 단계',
    items: [{ to: '/metrics/impressions', label: '노출수 (Impressions)' }],
  },
  {
    title: '클릭 단계',
    items: [
      { to: '/metrics/ctr', label: 'CTR (클릭률)' },
      { to: '/metrics/cpc', label: 'CPC (클릭당 비용)' },
    ],
  },
  {
    title: '전환 단계',
    items: [
      { to: '/metrics/cvr', label: 'CVR (전환율)' },
      { to: '/metrics/cpa', label: 'CPA (전환당 비용)' },
    ],
  },
  {
    title: '매출 단계',
    items: [{ to: '/metrics/roas', label: 'ROAS (광고수익률) ★' }],
  },
  {
    title: '부가 지표',
    items: [{ to: '/metrics/quality-score', label: '품질지수' }],
  },
  {
    title: '실전',
    items: [{ to: '/analysis', label: '내 데이터 종합 분석' }],
  },
  {
    title: '마케터의 사고법',
    items: [{ to: '/beyond-metrics', label: '🧭 지표를 넘어서' }],
  },
];

const DRAWER_WIDTH = 260;

export function Sidebar() {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          📚 광고 지표
        </Typography>
        <Typography variant="caption" color="text.secondary">
          네이버 광고 지표 학습
        </Typography>
      </Box>
      <Box sx={{ p: 1.5, overflowY: 'auto' }}>
        {groups.map((g) => (
          <Box key={g.title} sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontSize: 11,
              }}
            >
              {g.title}
            </Typography>
            <List dense disablePadding sx={{ mt: 0.5 }}>
              {g.items.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <ListItemButton
                    key={item.to}
                    component={NavLink}
                    to={item.to}
                    sx={{
                      borderRadius: 1.5,
                      mx: 0.5,
                      mb: 0.25,
                      bgcolor: active ? 'primary.50' : 'transparent',
                      color: active ? 'primary.main' : 'text.primary',
                      '&:hover': { bgcolor: active ? 'primary.50' : '#f1f5f9' },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: active ? 600 : 500,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
            <Divider sx={{ mt: 1.5, borderColor: '#f1f5f9' }} />
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}

export const SIDEBAR_WIDTH = DRAWER_WIDTH;
