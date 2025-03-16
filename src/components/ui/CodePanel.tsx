import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodePanel = ({
  code,
  output,
  theme,
  typingSpeed = 30,
  language = 'python',
}) => {
  const [activeTab, setActiveTab] = useState('code');
  const [typedCode, setTypedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [hasRun, setHasRun] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const speedMultiplierRef = useRef(1);
  const codeContainerRef = useRef(null);

  const isDark = theme === 'dark';

  // Normalize line endings and trim empty lines
  const normalizedCode = code.replace(/\r\n/g, '\n').replace(/\n+$/, '');

  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;

    let currentPosition = 0;
    const typeNextCharacter = () => {
      if (currentPosition < normalizedCode.length) {
        setTypedCode((prev) => prev + normalizedCode[currentPosition]);
        currentPosition++;
        const effectiveSpeed = typingSpeed / speedMultiplierRef.current;
        setTimeout(typeNextCharacter, effectiveSpeed);
      } else {
        setIsTyping(false);
      }
    };

    const timeoutId = setTimeout(typeNextCharacter, 500);
    return () => clearTimeout(timeoutId);
  }, [normalizedCode, typingSpeed, isTyping]);

  const handleRunCode = () => {
    setHasRun(true);
    if (isTyping) {
      setTypedCode(normalizedCode);
      setIsTyping(false);
    }
    setActiveTab('output');
    if (codeContainerRef.current) {
      codeContainerRef.current.scrollTop = 0;
    }
  };

  const cycleSpeed = () => {
    setSpeedMultiplier((prev) => (prev >= 4 ? 1 : prev + 1));
  };

  const skipTyping = () => {
    setTypedCode(normalizedCode);
    setIsTyping(false);
    if (codeContainerRef.current) {
      codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
    }
  };

  const tabVariants = {
    active: { color: isDark ? '#fff' : '#000', opacity: 1 },
    inactive: { color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', opacity: 0.7 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const renderHighlightedCode = () => {
    return typedCode.split('\n').map((line, lineIndex) => {
      const patterns = [
        {
          regex: /\b(def|class|import|from|return|if|else|elif|for|while|try|except|and|or|not|in|is|True|False|None)\b/g,
          className: isDark ? 'text-purple-400' : 'text-purple-600',
        },
        {
          regex: /(\w+)(?=\s*\()/g,
          className: isDark ? 'text-yellow-300' : 'text-yellow-600',
        },
        {
          regex: /(#.*)$/g,
          className: isDark ? 'text-green-400' : 'text-green-600',
        },
        {
          regex: /(['"])(.*?)\1/g,
          className: isDark ? 'text-orange-300' : 'text-orange-500',
        },
      ];

      let matches = [];
      patterns.forEach((pattern) => {
        let match;
        const regex = new RegExp(pattern.regex);
        while ((match = regex.exec(line)) !== null) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0],
            className: pattern.className,
          });
        }
      });

      matches.sort((a, b) => a.start - b.start);

      // Remove overlapping matches
      for (let i = 0; i < matches.length - 1; i++) {
        if (matches[i].end > matches[i + 1].start) {
          matches.splice(i + 1, 1);
          i--;
        }
      }

      const lineParts = [];
      let currentPos = 0;

      matches.forEach((match) => {
        if (match.start > currentPos) {
          lineParts.push(line.substring(currentPos, match.start));
        }
        lineParts.push(
          <span key={`${lineIndex}-${match.start}`} className={match.className}>
            {match.text}
          </span>
        );
        currentPos = match.end;
      });

      if (currentPos < line.length) {
        lineParts.push(line.substring(currentPos));
      }

      return (
        <div key={lineIndex} className="leading-5">
          {lineParts.length > 0 ? lineParts : line}
        </div>
      );
    });
  };

  const getFixedOutput = () => {
    if (typeof output === 'string') return output;
    if (Array.isArray(output)) return output.join('\n');
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg overflow-hidden shadow-2xl w-full max-w-full mx-auto ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      } border`}
    >
      {/* Header with tabs */}
      <div className={`px-2 sm:px-4 h-12 flex items-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'} overflow-x-auto`}>
        <div className="flex space-x-2 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <div className="flex ml-3 sm:ml-6 space-x-2 sm:space-x-4 flex-shrink-0">
          <motion.button
            variants={tabVariants}
            animate={activeTab === 'code' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('code')}
            className={`font-medium text-xs sm:text-sm py-1 px-2 sm:px-3 ${
              activeTab === 'code' && (isDark ? 'border-b-2 border-green-400' : 'border-b-2 border-green-600')
            }`}
          >
            main.py
          </motion.button>

          <motion.button
            variants={tabVariants}
            animate={activeTab === 'output' ? 'active' : 'inactive'}
            onClick={() => hasRun && setActiveTab('output')}
            className={`${!hasRun ? 'opacity-50 cursor-not-allowed' : ''} ${
              activeTab === 'output' && (isDark ? 'border-b-2 border-green-400' : 'border-b-2 border-green-600')
            } font-medium text-xs sm:text-sm py-1 px-2 sm:px-3`}
          >
            output
          </motion.button>
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cycleSpeed}
            className={`text-xs px-2 sm:px-3 py-1 rounded-full ${
              isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {speedMultiplier}x
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={isTyping ? skipTyping : handleRunCode}
            className={`px-2 sm:px-4 py-1 text-xs sm:text-sm rounded-full ${
              isDark
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            } ${isTyping ? '' : ''}`}
          >
            {isTyping ? 'Skip' : 'Run'}
            <span className="ml-1">▶</span>
          </motion.button>
        </div>
      </div>

      {/* Code/Output container */}
      <div
        ref={codeContainerRef}
        className={`overflow-auto scrollbar-hide ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
        style={{ height: '400px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'code' ? (
            <motion.div
              key="code"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex"
            >
              <div
                className={`font-mono text-xs py-4 select-none ${
                  isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
                } px-2 text-right min-w-[32px] sm:min-w-[40px]`}
              >
                {typedCode.split('\n').map((_, i) => (
                  <div key={i} className="leading-5">
                    {i + 1}
                  </div>
                ))}
              </div>

              <div
                className={`flex-1 p-2 sm:p-4 whitespace-pre font-mono text-xs sm:text-sm ${
                  isDark ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                <div className="leading-5">
                  {renderHighlightedCode()}
                </div>
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                  >
                    ▌
                  </motion.span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="output"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`p-2 sm:p-4 font-mono text-xs sm:text-sm ${
                isDark ? 'text-green-400 bg-black/30' : 'text-green-700 bg-green-50/50'
              }`}
            >
              <pre className="whitespace-pre-wrap">{getFixedOutput()}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div
        className={`h-6 px-2 sm:px-4 text-xs flex items-center justify-between ${
          isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
        }`}
      >
        <div>{language}.{activeTab === 'code' ? 'py' : 'out'}</div>
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${
            isTyping ? 'bg-yellow-400' : hasRun ? 'bg-green-400' : 'bg-gray-400'
          }`} />
          {isTyping ? 'Typing...' : hasRun ? 'Executed' : 'Ready'}
        </div>
      </div>
    </motion.div>
  );
};

export default CodePanel;