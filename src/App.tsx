import React, { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "./components/ui/Navbar";

// Lazy load components for better performance
const CustomCursor = lazy(() => import("./components/ui/Cursor"));
const HeroSection = lazy(() => import('./components/sections/Hero'));
const AboutSection = lazy(() => import("./components/sections/About"));
const SkillsSection = lazy(() => import("./components/sections/Skills"));
const ProjectsSection = lazy(() => import("./components/sections/Project"));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/sections/Footer'));

// Loading component for suspense fallback
const SectionLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-pulse">Loading...</div>
  </div>
);

const App: React.FC = () => {
    // Theme management
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        
        return localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    
    const [isScrolled, setIsScrolled] = useState(false);
    const theme = isDark ? 'dark' : 'light';
    
    // Device capability detection
    const [hasFinePointer, setHasFinePointer] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // Check for pointer capability and mobile device
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        // Check for fine pointer (mouse)
        const pointerQuery = window.matchMedia('(pointer: fine)');
        setHasFinePointer(pointerQuery.matches);
        
        // Check for mobile device
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mobileQuery.matches);
        
        // Set up listeners for changes
        const handlePointerChange = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
        const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        
        pointerQuery.addEventListener('change', handlePointerChange);
        mobileQuery.addEventListener('change', handleMobileChange);
        
        return () => {
            pointerQuery.removeEventListener('change', handlePointerChange);
            mobileQuery.removeEventListener('change', handleMobileChange);
        };
    }, []);
    
    // Theme effect
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [isDark]);
    
    // Scroll detection with throttling
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const toggleTheme = () => setIsDark(!isDark);
    
    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} overflow-x-hidden`}>
            {/* Only render cursor on desktop devices with mouse */}
            {hasFinePointer && !isMobile && (
                <Suspense fallback={null}>
                    <CustomCursor theme={theme} />
                </Suspense>
            )}
            
            <Navbar
                isScrolled={isScrolled}
                theme={theme}
                toggleTheme={toggleTheme}
                isMobile={isMobile}
            />
            
            <Suspense fallback={<SectionLoader />}>
                <HeroSection theme={theme} />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <AboutSection theme={theme} />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <SkillsSection theme={theme} />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <ProjectsSection theme={theme}/>
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <Contact theme={theme} />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <Footer theme={theme} />
            </Suspense>
        </div>
    );
};

export default App;