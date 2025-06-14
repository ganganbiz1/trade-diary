'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Header from '@/components/Header';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      {children}
    </Box>
  );
} 