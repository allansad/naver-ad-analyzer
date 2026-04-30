import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ParsedReport } from '../types';

interface DataContextValue {
  report: ParsedReport | null;
  setReport: (report: ParsedReport | null) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const STORAGE_KEY = 'naver-ad-analyzer-data';

function loadFromStorage(): { report: ParsedReport | null; fileName: string } {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { report: null, fileName: '' };
    const parsed = JSON.parse(raw);
    return { report: parsed.report ?? null, fileName: parsed.fileName ?? '' };
  } catch {
    return { report: null, fileName: '' };
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const initial = loadFromStorage();
  const [report, setReport] = useState<ParsedReport | null>(initial.report);
  const [fileName, setFileName] = useState(initial.fileName);

  useEffect(() => {
    if (report) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ report, fileName }));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [report, fileName]);

  return (
    <DataContext.Provider value={{ report, setReport, fileName, setFileName }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
