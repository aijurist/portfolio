import React from 'react';
import portfolioConfig from '../../config/portfolio-config';

interface FooterProps {
  theme: string;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Separator */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className={`h-px w-full ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
        </div>
      </div>

      <footer 
        className={`w-full py-10 ${
          isDark ? 'bg-black text-white/80' : 'bg-white text-black/80'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-2 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm font-dm">
                © {currentYear} {portfolioConfig.personal.name}. All rights reserved.
              </p>
              <p className="text-xs opacity-70">
                Built with <a href="https://react.dev/" className="underline">React</a> and 
                <a href="https://tailwindcss.com/" className="underline mx-1">Tailwind.</a>
                Source available on <a href={portfolioConfig.personal.socialLinks.github} className="underline">GitHub</a>.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5">
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
                    width="18" 
                    height="18" 
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
                    width="18" 
                    height="18" 
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
                    width="18" 
                    height="18" 
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
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
