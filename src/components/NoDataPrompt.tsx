import { Box, Typography, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Link as RouterLink } from 'react-router-dom';

export function NoDataPrompt() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
        border: '1px dashed #cbd5e1',
        borderRadius: 2,
        bgcolor: '#f8fafc',
      }}
    >
      <UploadFileIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
      <Typography variant="h4" sx={{ mb: 1 }}>
        데이터를 업로드하면 차트가 보입니다
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        네이버 광고주센터에서 다운로드한 "소재 목록" 엑셀 파일을 업로드하세요.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" size="small">
        업로드 페이지로
      </Button>
    </Box>
  );
}
