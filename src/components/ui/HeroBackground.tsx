import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  isDark: boolean;
  mousePosition: { x: number; y: number };
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ isDark, mousePosition }) => {
  const [networkPoints, setNetworkPoints] = useState<{x: number, y: number}[]>([]);
  
  useEffect(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    setNetworkPoints(points);
  }, []);

  // More precise cursor tracking with easing
  const cursorX = mousePosition.x;
  const cursorY = mousePosition.y;

  // Enhanced glow positioning - closer to the actual cursor
  const glowPositionX = cursorX * 100;
  const glowPositionY = cursorY * 100;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base grid pattern with improved tracking */}
      <div 
        className={`h-full w-full ${
          isDark 
            ? 'bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'
        }`}
        style={{
          backgroundSize: '30px 30px',
          backgroundPosition: `${mousePosition.x * 15}px ${mousePosition.y * 15}px`,
          transition: 'background-position 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      />
      
      {/* Neural network nodes and connections with improved animation */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 8}px, ${(mousePosition.y - 0.5) * 8}px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
        {/* Nodes with subtle pulse animation */}
        {networkPoints.map((point, index) => (
          <motion.circle 
            key={`node-${index}`} 
            cx={`${point.x}%`} 
            cy={`${point.y}%`} 
            r="1.5"
            className={isDark 
              ? index % 5 === 0 ? "fill-green-300/50" : "fill-white/30" 
              : index % 5 === 0 ? "fill-green-600/40" : "fill-black/20"
            }
            animate={index % 4 === 0 ? {
              r: [1.5, 2, 1.5],
              opacity: [0.3, 0.5, 0.3]
            } : undefined}
            transition={index % 4 === 0 ? {
              duration: 2 + index % 3,
              repeat: Infinity,
              ease: "easeInOut"
            } : undefined}
          />
        ))}
        
        {/* Enhanced connections between nodes */}
        {networkPoints.map((point, i) => 
          // Connect each point to nearby points with distance-based opacity
          networkPoints.slice(i+1, i+3).map((connectedPoint, j) => {
            const distance = Math.sqrt(
              Math.pow(point.x - connectedPoint.x, 2) + 
              Math.pow(point.y - connectedPoint.y, 2)
            );
            
            // Only draw connections if points are close enough
            if (distance < 30) {
              const opacity = 0.3 - (distance / 100);
              return (
                <motion.line 
                  key={`line-${i}-${j}`} 
                  x1={`${point.x}%`} 
                  y1={`${point.y}%`} 
                  x2={`${connectedPoint.x}%`} 
                  y2={`${connectedPoint.y}%`}
                  strokeOpacity={opacity}
                  className={isDark ? "stroke-white" : "stroke-black"} 
                  strokeWidth="0.5"
                  animate={i % 5 === 0 ? {
                    strokeOpacity: [opacity, opacity * 1.5, opacity]
                  } : undefined}
                  transition={i % 5 === 0 ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : undefined}
                />
              );
            }
            return null;
          })
        )}
      </svg>
      
      {/* Optimized binary code effect */}
      <div className="absolute inset-0 select-none pointer-events-none hidden lg:block">
        {Array.from({length: 3}).map((_, i) => (
          <motion.div 
            key={`binary-${i}`}
            className="absolute text-xs"
            animate={{
              y: [0, 400, 800],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              y: { duration: 15 + i * 5, ease: "linear", repeat: Infinity },
              opacity: { duration: 15 + i * 5, ease: "linear", repeat: Infinity }
            }}
            style={{
              top: `-100px`,
              left: `${20 + i * 30}%`,
              fontFamily: 'monospace',
              color: isDark 
                ? i === 1 ? 'rgba(134, 239, 172, 0.4)' : 'rgba(255,255,255,0.4)' 
                : i === 1 ? 'rgba(22, 163, 74, 0.3)' : 'rgba(0,0,0,0.3)'
            }}
          >
            {Array.from({length: 8}).map(() => Math.round(Math.random())).join('')}
          </motion.div>
        ))}
      </div>
      
      {/* Enhanced multi-layered glow effect */}
      <div 
        className="absolute inset-0 overflow-hidden transition-all duration-200"
        style={{ 
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
          pointerEvents: 'none'
        }}
      >
        {/* Primary glow - follows cursor closely */}
        <motion.div 
          className={`absolute rounded-full blur-[120px] ${isDark ? 'opacity-20' : 'opacity-10'}`}
          style={{ 
            width: '30%', 
            height: '30%',
            left: `${glowPositionX}%`,
            top: `${glowPositionY}%`,
            transform: 'translate(-50%, -50%)',
            background: isDark 
              ? 'radial-gradient(circle, rgba(74,222,128,1) 0%, rgba(22,163,74,0.5) 50%, rgba(0,0,0,0) 100%)' 
              : 'radial-gradient(circle, rgba(74,222,128,0.4) 0%, rgba(22,163,74,0.2) 50%, rgba(0,0,0,0) 100%)'
          }}
          animate={{
            width: ['30%', '33%', '30%'],
            height: ['30%', '33%', '30%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary ambient glow - subtle background effect */}
        {isDark && (
          <motion.div 
            className="absolute rounded-full blur-[180px] opacity-10"
            style={{ 
              width: '50%', 
              height: '50%',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(74,222,128,0.3) 0%, rgba(22,163,74,0.1) 70%, rgba(0,0,0,0) 100%)'
            }}
            animate={{
              width: ['50%', '55%', '50%'],
              height: ['50%', '55%', '50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HeroBackground;