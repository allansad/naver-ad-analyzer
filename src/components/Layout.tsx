import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar, SIDEBAR_WIDTH } from './Sidebar';

export function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          ml: 0,
          maxWidth: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
