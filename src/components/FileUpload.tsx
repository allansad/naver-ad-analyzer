import { useRef, useState, type DragEvent } from 'react';
import { Box, Typography, Alert, Stack, Chip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useData } from '../context/DataContext';
import { parseXlsxFile, XlsxParseError } from '../utils/parseXlsx';

interface Props {
  compact?: boolean;
}

export function FileUpload({ compact = false }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const { setReport, fileName, setFileName, report } = useData();

  async function handleFile(file: File | null | undefined) {
    if (!file) return;
    setError('');
    try {
      const parsed = await parseXlsxFile(file);
      setReport(parsed);
      setFileName(file.name);
    } catch (e) {
      if (e instanceof XlsxParseError) setError(e.message);
      else setError('파일 파싱 중 오류가 발생했습니다.');
      setReport(null);
      setFileName('');
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  if (compact && report) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Chip
          icon={<CheckCircleIcon />}
          label={`${fileName} (소재 ${report.items.length}개)`}
          color="success"
          variant="outlined"
          size="small"
        />
        <Typography
          variant="caption"
          color="primary"
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => fileInput.current?.click()}
        >
          다른 파일 업로드
        </Typography>
        <input
          ref={fileInput}
          type="file"
          accept=".xlsx,.xls"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </Stack>
    );
  }

  return (
    <Box>
      <Box
        onClick={() => fileInput.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        sx={{
          border: '2px dashed',
          borderColor: dragOver ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 6,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: dragOver ? 'primary.50' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
        }}
      >
        <UploadFileIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
          엑셀 파일을 선택하거나 여기에 드롭하세요
        </Typography>
        <Typography variant="caption" color="text.secondary">
          .xlsx, .xls · 데이터는 브라우저에서만 처리됩니다 (외부 전송 없음)
        </Typography>
        <input
          ref={fileInput}
          type="file"
          accept=".xlsx,.xls"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </Box>
      {fileName && !error && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {fileName} 업로드 완료. 좌측 메뉴에서 지표별 학습을 시작하세요.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
