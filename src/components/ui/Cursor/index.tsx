// src/components/ui/cursor/index.tsx
import React from 'react';
import { CursorProvider } from './CursorContext';
import { CursorRing } from './CursorRing';

interface CustomCursorProps {
  theme: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ theme }) => {
  return (
    <CursorProvider>
      <CursorRing theme={theme} />
    </CursorProvider>
  );
};

export default CustomCursor;