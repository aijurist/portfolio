import React, { useState, useEffect } from "react"; 
import { Navbar } from "./components/ui/Navbar"; 
import HeroSection from './components/sections/Hero';  

const App: React.FC = () => {   
  const [isDark, setIsDark] = useState(() => {     
    // Check if we're in the browser environment before accessing window
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = isDark ? 'dark' : 'light';

  useEffect(() => {     
    if (isDark) {       
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {       
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);    

  return (     
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} overflow-x-hidden`}>       
      <Navbar 
        isScrolled={isScrolled} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />       
      <HeroSection theme={theme} />
      {/* Add other sections here */}
    </div>   
  ); 
};  

export default App;