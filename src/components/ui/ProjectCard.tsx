import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCardProps {
  theme: string;
  project: {
    name: string;
    description: string;
    language: string;
    topics: string[];
    id: number;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ theme, project }) => {
  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);
  
  // Get language color
  const getLanguageColor = (language: string) => {
    const colors: {[key: string]: string} = {
      Python: '#3572A5',
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Java: '#b07219',
      Jupyter: '#DA5B0B',
      R: '#198CE7',
      Shell: '#89e051',
      Go: '#00ADD8',
    };
    
    return colors[language] || '#8e44ad'; // Default purple for unknown languages
  };

  // Handle card click to open GitHub repo
  const handleCardClick = () => {
    const username = 'aijurist'; // Replace with your actual username from config
    window.open(`https://github.com/${username}/${project.name}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 3 : 0,  // Reduced from 10 to 3
          rotateX: isHovered ? -1 : 0, // Reduced from -3 to -1
          scale: isHovered ? 1.01 : 1, // Reduced from 1.03 to 1.01
          boxShadow: isHovered 
            ? isDark
              ? '0 10px 20px -5px rgba(0, 0, 0, 0.6), 0 0 10px 0 rgba(99, 102, 241, 0.2)'
              : '0 10px 20px -5px rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(99, 102, 241, 0.1)'
            : 'none'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 200,  // Reduced from 300 to 200
          damping: 25     // Increased from 15 to 25 for less bouncy animation
        }}
        onClick={handleCardClick}
        className={`cursor-pointer w-full h-full rounded-xl overflow-hidden relative ${
          isDark
            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
            : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Header with Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
          <div 
            className={`w-full h-full opacity-20 ${isHovered ? 'opacity-30' : 'opacity-20'}`}
            style={{
              background: `linear-gradient(120deg, 
                ${getLanguageColor(project.language)}33, 
                ${getLanguageColor(project.language)}66)`,
              transition: 'opacity 0.4s ease'
            }}
          ></div>
        </div>
        
        {/* Card Content */}
        <div className={`px-6 pt-6 relative z-10`}>
          <div className="flex justify-between items-start">
            {/* Project Name & Language */}
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm" 
                  style={{ backgroundColor: getLanguageColor(project.language) }}
                ></div>
                <h3 className={`font-dm text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.name}
                </h3>
              </div>
            </div>
            
            {/* Code Icon with subtle lift */}
            <motion.div
              whileHover={{ scale: 1.05 }} // Reduced from 1.1 to 1.05
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                isDark ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
              style={{
                transform: isHovered ? 'translateZ(3px)' : 'translateZ(0px)', // Reduced from 10px to 3px
                transition: 'transform 0.4s ease'
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={isDark ? "text-indigo-400" : "text-indigo-500"}
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </motion.div>
          </div>
        </div>
        
        {/* Project Description with subtle depth */}
        <div 
          className="px-6 py-6 flex-grow"
          style={{
            transform: isHovered ? 'translateZ(2px)' : 'translateZ(0px)',
            transition: 'transform 0.4s ease'
          }}
        >
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
            {project.description || "No description available"}
          </p>
        </div>
        
        <div 
          className="px-6 pb-4"
          style={{
            transform: isHovered ? 'translateZ(3px)' : 'translateZ(0px)',
            transition: 'transform 0.4s ease'
          }}
        >
          <div className="flex flex-wrap gap-1.5">
            {project.topics && project.topics.slice(0, 3).map((topic, index) => (
              <motion.span 
                key={index}
                whileHover={{ y: -1 }}
                className={`px-2.5 py-1 text-xs rounded-full ${
                  isDark 
                    ? 'bg-slate-700/60 text-slate-300' 
                    : 'bg-slate-100 text-slate-700'
                } transition-colors duration-300`}
                style={{
                  boxShadow: isHovered ? '0 1px 2px rgba(0,0,0,0.07)' : 'none', // Reduced shadow
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                #{topic}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Accent Line with gentler animation */}
        <div className="absolute bottom-0 left-0 w-full h-1">
          <motion.div 
            className="h-full"
            style={{ 
              background: `linear-gradient(to right, ${getLanguageColor(project.language)}aa, ${getLanguageColor(project.language)}55)`,
              width: isHovered ? '75%' : '30%', 
              transition: 'width 0.6s ease-out'
            }}
          ></motion.div>
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }} 
              className="absolute inset-0 flex items-center justify-center p-6 z-20"
            >
              <div 
                className={`absolute inset-0`}
                style={{ 
                  backdropFilter: 'blur(4px)',
                  background: isDark 
                    ? `linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.8))`
                    : `linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(241, 245, 249, 0.8))`
                }}
              ></div>
              
              <div className="relative z-10 text-center" style={{ transform: 'translateZ(5px)' }}> {/* Reduced from 20px to 5px */}
                <motion.div 
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }} // More damping
                  className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4`} // Reduced size from 16 to 14
                  style={{
                    background: `linear-gradient(135deg, ${getLanguageColor(project.language)}22, ${getLanguageColor(project.language)}44)`,
                    boxShadow: `0 4px 8px -2px ${getLanguageColor(project.language)}33` // Reduced shadow
                  }}
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
                    style={{ color: getLanguageColor(project.language) }}
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </motion.div>
                
                <motion.div
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <h4 className={`font-dm font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    View Repository
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Explore this project on GitHub
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: isDark
              ? `radial-gradient(circle at 70% 30%, ${getLanguageColor(project.language)}15, rgba(0, 0, 0, 0) 70%)` // Reduced opacity
              : `radial-gradient(circle at 70% 30%, ${getLanguageColor(project.language)}08, rgba(0, 0, 0, 0) 70%)`, // Reduced opacity
            opacity: isHovered ? 0.8 : 0.4, // Reduced max opacity
            transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Reduced from 1.2 to 1.1
            transition: 'transform 0.7s ease, opacity 0.7s ease' // Slower for gentler effect
          }}
        ></div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;