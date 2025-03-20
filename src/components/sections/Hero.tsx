import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import portfolioConfig from '../../config/portfolio-config';
import HeroBackground from '../ui/HeroBackground';

interface HeroSectionProps {
  theme: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef(mousePosition);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };

    const updateStore = () => {
      setMousePosition(mousePosRef.current);
    };

    const mouseMoveListener = (e: MouseEvent) => updatePosition(e);
    const interval = setInterval(updateStore, 100);

    window.addEventListener('mousemove', mouseMoveListener);
    return () => {
      window.removeEventListener('mousemove', mouseMoveListener);
      clearInterval(interval);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const isDark = theme === 'dark';

  return (
    <section
      id="hero"
      className={`relative h-screen flex items-center w-full overflow-hidden ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* AI-themed background */}
      <HeroBackground isDark={isDark} mousePosition={mousePosition} />

      {/* Main content */}
      <div className="container px-4 sm:px-6 lg:px-8 z-10 pt-16 md:pt-20 w-full">
        <div className="flex flex-col md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto md:mx-0 md:ml-12 lg:ml-20 xl:ml-28 my-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full text-left"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants} className="overflow-hidden">
              <span 
                className={`inline-block font-mono text-xl mb-2 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                } tracking-wide`}
              >
                {portfolioConfig.hero.greeting}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="overflow-hidden">
              <h1 
                className={`font-sirin text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-3 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
                style={{ letterSpacing: '-0.02em' }}
              >
                {portfolioConfig.personal.name}
              </h1>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="overflow-hidden">
                <h2 
                    className={`font-dm text-lg sm:text-xl lg:text-2xl font-medium mb-5 ${
                    isDark ? 'text-white/90' : 'text-black/90'
                    }`}
                >
                    {portfolioConfig.hero.title[0]}, <span className="text-green-500">{portfolioConfig.hero.title[1]}</span> {portfolioConfig.hero.title[2]}
                </h2>
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`px-7 py-2.5 rounded-full font-medium text-sm border transition-all duration-300 
                    ${theme === 'dark' ? 'border-white/30 text-white/90 hover:border-white/50' : 'border-black/30 text-black/90 hover:border-black/50'}
                    font-dm`}
              >
                Explore My Work
              </motion.a>
              
              <motion.a
                href={portfolioConfig.personal.resumeLink}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`px-7 py-2.5 rounded-full font-medium text-sm border transition-all duration-300 
                    ${theme === 'dark' ? 'border-white/30 text-white/90 hover:border-white/50' : 'border-black/30 text-black/90 hover:border-black/50'}
                    font-dm`}
                target="_blank"
                rel="noopener noreferrer"
                >
                Resume
                </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center gap-4"
            >
              {/* GitHub */}
              <a
                href={portfolioConfig.personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDark 
                    ? 'bg-white/10 text-white group-hover:bg-white/20' 
                    : 'bg-black/10 text-black group-hover:bg-black/20'
                }`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={portfolioConfig.personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDark 
                    ? 'bg-white/10 text-white group-hover:bg-white/20' 
                    : 'bg-black/10 text-black group-hover:bg-black/20'
                }`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </a>
              
              {/* Email */}
              <a
                href={`mailto:${portfolioConfig.personal.email}`}
                className="group"
                aria-label="Email"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDark 
                    ? 'bg-white/10 text-white group-hover:bg-white/20' 
                    : 'bg-black/10 text-black group-hover:bg-black/20'
                }`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={isDark ? 'text-white/40' : 'text-black/40'}
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;