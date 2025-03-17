import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillIcons from '../ui/SkillIcon'; // Import the SkillIcons component

interface SkillsSectionProps {
  theme: string;
}

// Define skill type for better type safety
interface Skill {
  name: string;
  proficiency: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('AI & ML');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const isDark = theme === 'dark';
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // Animation variants for skill cards
  const skillCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      }
    }
  };

  // Define skill categories with their skills
  const skillCategories: SkillCategory[] = [
    {
      name: 'AI & ML',
      skills: [
        { name: 'Python', proficiency: 95 },
        { name: 'Langchain', proficiency: 90 },
        { name: 'LangGraph', proficiency: 85 },
        { name: 'TensorFlow', proficiency: 80 },
        { name: 'Scikit-Learn', proficiency: 75 },
        { name: 'Polars', proficiency: 82 },
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'FastAPI', proficiency: 90 },
        { name: 'Flask', proficiency: 85 },
        { name: 'Django', proficiency: 50 },
        { name: 'Pydantic', proficiency: 88 },
        { name: 'SQL', proficiency: 65 },
        { name: 'PostgreSQL', proficiency: 40 },
      ]
    },
    {
      name: 'Frontend',
      skills: [
        { name: 'JavaScript', proficiency: 60 },
        { name: 'TypeScript', proficiency: 55 },
        { name: 'React', proficiency: 60 },
        { name: 'HTML/CSS', proficiency: 65 },
        { name: 'Tailwind CSS', proficiency: 70 },
        { name: 'Streamlit', proficiency: 58 },
      ]
    },
    {
      name: 'DevOps',
      skills: [
        { name: 'Docker', proficiency: 80 },
        { name: 'Git', proficiency: 85 },
        { name: 'Cloud Platforms', proficiency: 65 },
      ]
    }
  ];

  // Improved tab switching handler
  const handleCategoryChange = (categoryName: string) => {
    if (categoryName !== activeCategory) {
      setIsChangingCategory(true);
      setTimeout(() => {
        setActiveCategory(categoryName);
        setIsChangingCategory(false);
      }, 300);
    }
  };

  // Get active skills based on selected category
  const getActiveSkills = () => {
    const category = skillCategories.find(cat => cat.name === activeCategory);
    return category ? category.skills : [];
  };

  // Get proficiency level description
  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 80) return "Advanced";
    if (proficiency >= 65) return "Intermediate";
    return "Familiar";
  };

  // Get proficiency color
  const getProficiencyColor = (proficiency: number, isDark: boolean) => {
    if (proficiency >= 90) {
      return isDark ? 'from-green-400 to-green-200' : 'from-green-500 to-green-400';
    }
    if (proficiency >= 80) {
      return isDark ? 'from-green-500 to-teal-400' : 'from-green-500 to-teal-500';
    }
    if (proficiency >= 70) {
      return isDark ? 'from-teal-500 to-blue-400' : 'from-teal-500 to-blue-500';
    }
    return isDark ? 'from-blue-500 to-indigo-400' : 'from-blue-500 to-indigo-500';
  };

  return (
    <section
      id="skills"
      className={`relative py-24 overflow-hidden ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div 
          className={`h-full w-full ${
            isDark 
              ? 'bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]' 
              : 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'
          }`}
          style={{
            backgroundSize: '40px 40px',
            backgroundPosition: `${mousePosition.x * 10}px ${mousePosition.y * 10}px`,
            transition: 'background-position 0.2s ease-out',
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: isDark 
              ? `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(34, 197, 94, 0.05) 0%, rgba(0, 0, 0, 0) 50%)`
              : `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(34, 197, 94, 0.03) 0%, rgba(255, 255, 255, 0) 60%)`,
            transition: 'background 0.3s ease-out'
          }}
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-sirin font-bold mb-4 tracking-tight ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Technical Expertise
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-green-500 mx-auto mb-6 opacity-80"
          ></motion.div>
          <motion.p 
            variants={itemVariants}
            className={`max-w-2xl mx-auto text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } font-dm`}
          >
            Specialized in AI technologies and modular development with a focus on modern frameworks
          </motion.p>
        </motion.div>

        {/* Improved Category Tabs */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.name
                  ? isDark
                    ? 'bg-white text-black shadow-lg shadow-white/20'
                    : 'bg-black text-white shadow-lg shadow-black/20'
                  : isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-black hover:bg-black/20'
              } font-dm`}
              disabled={isChangingCategory}
            >
              {category.name}
              {activeCategory === category.name && (
                <span className="ml-3 mb-0.5 inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid with improved animation */}
        <div className="min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {getActiveSkills().map((skill, index) => (
                <motion.div
                  key={`${activeCategory}-${skill.name}`}
                  variants={skillCardVariants}
                  transition={{ delay: index * 0.05 }}
                  className={`p-0 rounded-xl overflow-hidden ${
                    isDark 
                      ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10' 
                      : 'bg-gradient-to-br from-white to-gray-50 border border-black/5 shadow-sm'
                  } transition-all duration-300`}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: isDark 
                      ? '0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(34, 197, 94, 0.2)' 
                      : '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 0 10px 0 rgba(34, 197, 94, 0.1)',
                    transition: { duration: 0.2 } 
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Top color bar - varies by proficiency */}
                  <div className={`h-1 w-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency, isDark)}`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-start">
                      {/* Improved icon container */}
                      <div 
                        className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4
                          ${isDark 
                            ? hoveredSkill === skill.name ? 'bg-green-500/20 shadow-md shadow-green-500/20' : 'bg-white/10'
                            : hoveredSkill === skill.name ? 'bg-green-500/10 shadow-md shadow-green-500/10' : 'bg-black/5'
                          } transition-all duration-300`}
                      >
                        <SkillIcons 
                          name={skill.name} 
                          className={`w-6 h-6 ${
                            hoveredSkill === skill.name 
                              ? 'text-green-400' 
                              : 'text-green-500'
                          } transition-colors duration-300`} 
                        />
                      </div>
                      
                      {/* Skill details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className={`font-dm font-semibold text-lg ${
                            isDark ? 'text-white' : 'text-black'
                          }`}>{skill.name}</h3>
                          
                          {/* Proficiency level badge */}
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ml-2 ${
                            skill.proficiency >= 90
                              ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'
                              : skill.proficiency >= 80
                                ? isDark ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-800'
                                : skill.proficiency >= 70
                                  ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
                                  : isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {getProficiencyLevel(skill.proficiency)}
                          </span>
                        </div>
                        {/* Skill Proficiency Bar with enhanced design */}
                        <div className="mt-3">
                          <div className="flex justify-between mb-1.5 text-xs font-medium">
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Proficiency</span>
                            <span className={isDark ? 'text-white' : 'text-black'}>{skill.proficiency}%</span>
                          </div>
                          <div className={`w-full h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'} overflow-hidden`}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                              className={`h-full rounded-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency, isDark)}`}
                            ></motion.div>
                          </div>
                        </div>
                        
                        {/* Skill card footer with additional context - only visible on hover */}
                        <AnimatePresence>
                          <div className="relative">
                            {hoveredSkill === skill.name && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`absolute -top-14 right-0 transform px-4 py-2 rounded-md text-xs font-medium z-10 ${
                                  isDark ? 'bg-zinc-800 text-gray-200 border border-white/10' : 'bg-white text-gray-700 border border-black/5 shadow-md'
                                }`}
                              >
                                <div className="flex items-center gap-1.5">
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 9L21 3L15 3" stroke={isDark ? "#22c55e" : "#16a34a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 3L14 10" stroke={isDark ? "#22c55e" : "#16a34a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 4H7.8C5.1198 4 3.7797 4 2.77009 4.54741C1.88563 5.02154 1.17157 5.7356 0.697435 6.62006C0.150024 7.62966 0.150024 8.96979 0.150024 11.65V16.2C0.150024 18.8802 0.150024 20.2203 0.697435 21.2299C1.17157 22.1144 1.88563 22.8284 2.77009 23.3026C3.7797 23.85 5.1198 23.85 7.8 23.85H12.35C15.0302 23.85 16.3703 23.85 17.3799 23.3026C18.2644 22.8284 18.9784 22.1144 19.4526 21.2299C20 20.2203 20 18.8802 20 16.2V14" stroke={isDark ? "#22c55e" : "#16a34a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <span>{Math.ceil(skill.proficiency / 20)} Projects</span>
                                </div>
                                
                                {/* Small triangle pointer */}
                                <div 
                                  className={`absolute -bottom-1.5 right-4 w-3 h-3 transform rotate-45 ${
                                    isDark ? 'bg-zinc-800 border-r border-b border-white/10' : 'bg-white border-r border-b border-black/5'
                                  }`}
                                ></div>
                              </motion.div>
                            )}
                          </div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced call to action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className={`text-md max-w-2xl mx-auto my-auto font-dm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Always exploring new technologies and improving my skillset to stay at the cutting edge.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-7 py-2.5 rounded-full font-medium text-sm inline-flex items-center transition-all duration-300
                ${isDark 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-black text-white hover:bg-black/90'
                } font-dm`}
            >
              <span>See My Projects</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;