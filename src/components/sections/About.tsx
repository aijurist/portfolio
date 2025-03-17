import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CodePanel from '../ui/CodePanel';
import portfolioConfig from '../../config/portfolio-config';

interface AboutSectionProps {
  theme: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Python code that will display in the code panel
  const pythonCode = `# about_me.py
# A simple program to tell you about ${portfolioConfig.personal.name}

class Developer:
    def __init__(self, name, title, location):
        self.name = name
        self.title = title
        self.location = location
        self.skills = []
        self.interests = []
        self.experience = []
        
    def add_skill(self, skill):
        self.skills.append(skill)
        
    def add_interest(self, interest):
        self.interests.append(interest)
        
    def add_experience(self, company, role, period):
        self.experience.append({
            "company": company,
            "role": role,
            "period": period
        })
        
    def print_about_me(self):
        """Prints information about the developer"""
        print(f"👋 Hi, I'm {self.name}")
        print(f"📌 {self.title} based in {self.location}")
        print("\\n🧰 Skills:")
        for skill in self.skills:
            print(f"  • {skill}")
            
        print("\\n🌟 Interests:")
        for interest in self.interests:
            print(f"  • {interest}")
            
        print("\\n💼 Experience:")
        for exp in self.experience:
            print(f"  • {exp['role']} at {exp['company']} ({exp['period']})")
            
        print("\\n🔍 More about me:")
        print("""${portfolioConfig.about.description}""")


# Create my profile
me = Developer(
    name="${portfolioConfig.personal.name}",
    title="${portfolioConfig.hero.title.join(' ')}",
    location="${portfolioConfig.personal.location}"
)

# Add my skills
${portfolioConfig.skills.technical.slice(0, 5).map(skill => `me.add_skill("${skill}")`).join('\n')}

# Add my interests
${portfolioConfig.about.interests.map(interest => `me.add_interest("${interest}")`).join('\n')}

# Add my experience
${portfolioConfig.experience.slice(0, 3).map(exp => 
  `me.add_experience("${exp.company}", "${exp.role}", "${exp.period}")`
).join('\n')}

# Let's run it!
me.print_about_me() `;

  // Output to display when "Run" is clicked
  const outputContent = `👋 Hi, I'm ${portfolioConfig.personal.name}
📌 ${portfolioConfig.hero.title.join(' ')} based in ${portfolioConfig.personal.location}

🧰 Skills:
  • ${portfolioConfig.skills.technical.slice(0, 5).join('\n  • ')}
  
🌟 Interests:
  • ${portfolioConfig.about.interests.join('\n  • ')}
  
💼 Experience:
  • ${portfolioConfig.experience.slice(0, 3).map(exp => 
      `${exp.role} at ${exp.company} (${exp.period})`
    ).join('\n  • ')}
  
🔍 More about me:
${portfolioConfig.about.description}`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center py-20 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Left column - Section title and description */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-5/12 text-left"
          >
            <h2 className="font-sirin text-4xl sm:text-5xl font-bold mb-6">
              About <span className="text-green-500">Me</span>
            </h2>
            
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Get to know me better through this interactive code snippet. Feel free to run the code and see the output!
            </p>
            
            <div className="flex flex-col gap-4">
              <div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-white/10' : 'bg-black/5'
                }`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Personal Touch</h3>
                  <p>Learn about my background and interests.</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-white/10' : 'bg-black/5'
                }`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Skills & Experience</h3>
                  <p>Discover my technical skills and work history.</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-white/10' : 'bg-black/5'
                }`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Interactive Bio</h3>
                  <p>Click "Run" to see my profile in action.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Interactive code panel */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-7/12"
          >
            {['dark', 'light'].includes(theme) && (
              <CodePanel
                code={pythonCode}
                output={outputContent}
                theme={theme as 'dark' | 'light'}
                typingSpeed={20}
                language="python"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;