import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import portfolioConfig from '../../config/portfolio-config';

interface ProjectsSectionProps {
  theme: string;
}

interface GitHubProject {
  id: number;
  name: string;
  description: string;
  language: string;
  topics: string[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const isDark = theme === 'dark';
  
  // Fetch GitHub projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        let githubProjects: GitHubProject[] = [];
        
        // Specific AI-focused repositories
        const featuredRepos = [
          "pytokei", 
          "HappyFox-Hackathon", 
          "SIH-COALWORKS-AI", 
          "Twitter-Validation-using-BERT"
        ];
        
        const username = portfolioConfig.github.username;
        
        const promises = featuredRepos.map(repo => 
          fetch(`https://api.github.com/repos/${username}/${repo}`, {
            headers: {
              'Authorization': `token ${portfolioConfig.github.token}`,
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch repo ${repo}`);
            }
            return response.json();
          })
          .then(data => {
            // Simplify the data to only include what we need
            return {
              id: data.id,
              name: data.name,
              description: data.description || "AI development module",
              language: data.language || "Python",
              topics: data.topics || ["ai", "machine-learning"]
            };
          })
        );
        
        githubProjects = await Promise.all(promises);
        setProjects(githubProjects);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub projects:', err);
        setError('Failed to load projects. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const displayedProjects = projects.slice(0, 4);
  return (
    <section
      id="projects"
      className={`relative py-28 ${
        isDark ? 'bg-black' : 'bg-gray-50'
      }`}
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full ${
          isDark ? 'bg-green-500/5' : 'bg-green-500/5'
        } blur-3xl`}></div>
        <div className={`absolute top-1/2 -left-20 w-64 h-64 rounded-full ${
          isDark ? 'bg-green-500/5' : 'bg-green-500/5'
        } blur-3xl`}></div>
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
            className={`font-sirin text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="inline-block relative">
              Featured Projects
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-green-500" 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.span>
            </span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className={`max-w-2xl mx-auto text-lg mb-12 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } font-dm`}
          >
            Innovative solutions at the intersection of AI and practical applications
          </motion.p>
          
            </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-32">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full border-4 animate-spin ${
                isDark ? 'border-white/20 border-t-white/90' : 'border-gray-200 border-t-green-500'
              }`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className={`text-center py-16 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            <svg className="w-16 h-16 mx-auto mb-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p className="text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={`mt-4 px-6 py-2 rounded-full text-sm font-medium ${
                isDark 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-black/10 text-black hover:bg-black/20'
              }`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && displayedProjects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} theme={theme} />
            ))}
          </motion.div>
        ) : !isLoading && !error ? (
          <div className="text-center py-16">
            <div className={`text-6xl mb-4 ${isDark ? 'text-white/30' : 'text-gray-300'}`}>🔍</div>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No projects found for this category
            </p>
          </div>
        ) : null}

        {/* GitHub CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <motion.div 
            variants={itemVariants}
            className={`rounded-2xl overflow-hidden shadow-lg relative ${
              isDark ? 'bg-zinc-800/50 backdrop-blur-sm' : 'bg-white'
            }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full ${
                isDark ? 'bg-green-500/20' : 'bg-green-500/10'
              } blur-xl`}></div>
              <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full ${
                isDark ? 'bg-green-500/10' : 'bg-green-500/5'
              } blur-xl`}></div>
            </div>
            
            <div className="p-8 sm:p-10 relative z-10 flex flex-col sm:flex-row items-center gap-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-zinc-700' : 'bg-gray-100'
              }`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Explore More Projects
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Check out my GitHub repository for more projects and open-source contributions.
                </p>
                <motion.a
                  href={`https://github.com/${portfolioConfig.github.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium ${
                    isDark
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-black text-white hover:bg-black/90'
                  }`}
                >
                  <span>View GitHub Profile</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;