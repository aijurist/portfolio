import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

interface CursorContextType {
  position: { x: number; y: number };
  isPointer: boolean;
  isActive: boolean;
}

const CursorContext = createContext<CursorContextType>({
  position: { x: 0, y: 0 },
  isPointer: false,
  isActive: false,
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const lastCheckTimeRef = useRef(0);
    const posRef = useRef(position);
    const CHECK_INTERVAL = 100;
  
    const updateCursorPosition = useCallback((e: MouseEvent) => {
      const newX = Math.round(e.clientX);
      const newY = Math.round(e.clientY);
      
      if (posRef.current.x !== newX || posRef.current.y !== newY) {
        posRef.current = { x: newX, y: newY };
        setPosition({ x: newX, y: newY });
      }
  
      const now = Date.now();
      if (now - lastCheckTimeRef.current >= CHECK_INTERVAL) {
        lastCheckTimeRef.current = now;
        const element = document.elementFromPoint(newX, newY);
        const interactiveElement = element?.closest(
          'button, a, input, [role="button"], [data-clickable]'
        );
        setIsPointer(!!interactiveElement);
      }
    }, []);
  
    useEffect(() => {
      let rafId: number;
      let lastMoveTime = 0;
      const THROTTLE_DELAY = 16; // ~60fps
  
      const handleMouseMove = (e: MouseEvent) => {
        const now = performance.now();
        if (now - lastMoveTime >= THROTTLE_DELAY) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            updateCursorPosition(e);
          });
          lastMoveTime = now;
        }
      };
  
      // Rest of the useEffect remains unchanged
      const handleMouseDown = () => setIsActive(true);
      const handleMouseUp = () => setIsActive(false);
  
      const style = document.createElement('style');
      style.textContent = `
        body, a, button, input, [role="button"], [data-clickable] {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
  
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mousedown', handleMouseDown, { passive: true });
      window.addEventListener('mouseup', handleMouseUp, { passive: true });
  
      setPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
  
      return () => {
        cancelAnimationFrame(rafId);
        document.head.removeChild(style);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [updateCursorPosition]);
  
    const memoizedValue = React.useMemo(() => {
      return { position, isPointer, isActive };
    }, [position, isPointer, isActive]);
  
    return (
      <CursorContext.Provider value={memoizedValue}>
        {children}
      </CursorContext.Provider>
    );
  };