import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../ui/ThemeToggle";
import portfolioConfig from "../../config/portfolio-config";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
];

interface NavbarProps {
  isScrolled: boolean;
  theme: string;
  toggleTheme: () => void;
}

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      d={isOpen ? "M18 6L6 18M6 6L18 18" : "M4 6h16M4 12h16M4 18h16"}
      animate={{
        d: isOpen ? "M18 6L6 18M6 6L18 18" : "M4 6h16M4 12h16M4 18h16",
      }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  theme,
  toggleTheme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isDark = theme === 'dark';

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 z-50 w-full sm:w-auto max-w-[95vw]"
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.5 }}
        style={{ transform: "translateX(-50%)" }}
      >
        {/* Desktop Menu */}
        <div
          className={`hidden sm:block ${
            isDark ? "bg-black/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md"
          } ${isScrolled ? "shadow-md" : ""} px-6 py-3 rounded-full transition-all duration-300`}
        >
          <ul
            className="flex items-center justify-center space-x-2 relative"
            onMouseLeave={() => {
              setPosition({
                left: 0,
                width: 0,
                opacity: 0,
              });
              setHoveredItem(null);
            }}
          >
            {navItems.map((item) => (
              <Tab 
                key={item.name} 
                setPosition={setPosition} 
                href={item.href} 
                theme={theme}
                isHovered={hoveredItem === item.name}
                onHover={() => setHoveredItem(item.name)}
              >
                {item.name}
              </Tab>
            ))}
            <motion.li
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isScrolled ? 1 : 0,
                width: isScrolled ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <a
                href={`mailto:${portfolioConfig.personal.email}`}
                className={`inline-block ${
                  isDark ? "bg-white text-black" : "bg-black text-white"
                } px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap hover:bg-opacity-90 transition-colors`}
              >
                Contact
              </a>
            </motion.li>
            <Cursor position={position} theme={theme} />
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Menu Button and Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="relative flex justify-center">
          <div
            className={`absolute bottom-0 left-0 right-0 h-20 ${
              isDark ? "bg-zinc-900/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md"
            } rounded-t-3xl shadow-lg transition-all duration-300`}
          ></div>
          <button
            onClick={toggleMenu}
            className={`relative z-10 w-14 h-14 rounded-full ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            } flex items-center justify-center shadow-lg mb-3`}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`sm:hidden fixed bottom-24 left-4 right-4 ${
              isDark ? "bg-zinc-900/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md"
            } rounded-3xl shadow-lg overflow-hidden z-40 transition-all duration-300`}
          >
            <ul className="py-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`block px-6 py-3 text-lg font-medium transition-colors ${
                      isDark ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="px-6 pt-2 pb-4">
                <a
                  href="mailto:career@spike.codes"
                  className={`block w-full px-4 py-3 text-lg font-medium text-center ${
                    isDark ? "bg-white text-black" : "bg-black text-white"
                  } hover:bg-opacity-90 transition-colors rounded-full`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Toggle */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: (position: { left: number; width: number; opacity: number }) => void;
  href: string;
  theme: string;
  isHovered: boolean;
  onHover: () => void;
}

const Tab: React.FC<TabProps> = ({ children, setPosition, href, theme, onHover }) => {
  const ref = useRef<HTMLLIElement>(null);
  const isDark = theme === 'dark';

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width: width,
          opacity: 1,
        });
        onHover();
      }}
      className="relative z-10"
    >
      <a
        href={href}
        className={`block px-4 py-2 rounded-full text-md font-medium transition-colors ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {children}
      </a>
    </li>
  );
};

interface CursorProps {
  position: { left: number; width: number; opacity: number };
  theme: string;
}

const Cursor: React.FC<CursorProps> = ({ position, theme }) => {
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      animate={position}
      initial={{ opacity: 0 }}
      className={`absolute z-0 h-8 rounded-full ${
        isDark ? "bg-white/10" : "bg-black/5"
      } transition-colors`}
      style={{
        width: position.width,
        left: position.left,
        opacity: position.opacity,
      }}
    />
  );
};

export default Navbar;