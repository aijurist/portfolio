import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  theme: string;
}

const CustomCursor: React.FC<CustomCursorProps> = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const handlePointerDetection = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isInteractive = hoveredElement?.matches(
        'button, a, input, [role="button"], [data-clickable]'
      );
      setIsPointer(!!isInteractive);
    };

    document.body.style.cursor = 'none';
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handlePointerDetection);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handlePointerDetection);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position.x, position.y]);

  return (
    <>
      <motion.div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-[1000] mix-blend-difference"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isPointer ? 1.3 : isActive ? 0.9 : 1,
          opacity: isPointer ? 1 : 0.8,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="transition-opacity duration-200"
        >
          <motion.circle
            cx="24"
            cy="24"
            r="12"
            stroke="white"
            strokeWidth="1.2"
          />
          {/* {isPointer && (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2 }}
              d="M18 24L22 28L30 20"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          )} */}
        </svg>
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[1000] mix-blend-difference"
        style={{
          backgroundColor: 'white',
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        animate={{
          scale: isActive ? 1.8 : 1,
          opacity: isPointer ? 0.6 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;