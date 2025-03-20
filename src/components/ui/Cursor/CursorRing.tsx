import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from './CursorContext';

interface CursorRingProps {
  theme: string;
}

// Using memo to prevent unnecessary re-renders
export const CursorRing: React.FC<CursorRingProps> = memo(({ theme }) => {
  const { position, isPointer, isActive } = useCursor();
  
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      className={`fixed pointer-events-none z-50 h-8 w-8 rounded-full border-2 ${
        isDark ? 'border-white' : 'border-black'
      } ${isActive ? 'opacity-80' : 'opacity-50'}`}
      style={{
        translateX: position.x - 16,
        translateY: position.y - 16,
        // Using translateX/Y instead of x/y for better performance
      }}
      animate={{
        translateX: position.x - 16,
        translateY: position.y - 16,
        scale: isPointer ? 1.3 : isActive ? 0.8 : 1,
      }}
      transition={{
        translateX: { type: "tween", duration: 0.05, ease: "circOut" },
        translateY: { type: "tween", duration: 0.05, ease: "circOut" },
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
    />
  );
});

// Display name for React DevTools
CursorRing.displayName = 'CursorRing';