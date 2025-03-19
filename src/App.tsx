import React, { useState, useEffect } from "react";
import { Navbar } from "./components/ui/Navbar";
import HeroSection from './components/sections/Hero';
import Contact from './components/sections/Contact';
import AboutSection from "./components/sections/About";
import SkillsSection from "./components/sections/Skills";
import CustomCursor from "./components/ui/CustomCursor";
import Footer from "./components/sections/Footer";
import ProjectsSection from "./components/sections/Project";

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
    const [hasFinePointer, setHasFinePointer] = useState(
        typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(pointer: fine)');
        const handleChange = (e: MediaQueryListEvent) => {
            setHasFinePointer(e.matches);
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);
    
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
            {hasFinePointer && <CustomCursor theme={theme} />}
            <Navbar
                isScrolled={isScrolled}
                theme={theme}
                toggleTheme={toggleTheme}
            />
            <HeroSection theme={theme} />
            <AboutSection theme={theme} />
            <SkillsSection theme={theme} />
            <ProjectsSection theme={theme} />
            <Contact theme={theme} />
            <Footer theme={theme} />
        </div>
    );
};

export default App;