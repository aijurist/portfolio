/* eslint-disable @typescript-eslint/no-explicit-any */
const portfolioConfig = {
  personal: {
    name: "Shanthosh S",
    title: "AI Engineer",
    bio: "3rd year CSE student at Rajalakshmi Engineering College with expertise in GenAI models optimization, machine learning, and building intelligent agents. Passionate about creating modular AI solutions that solve real-world problems.",
    location: "Chennai, Tamil Nadu, India",
    email: "shanthosh811@gmail.com",
    profilePicture: "/assets/images/profile.jpg", // Add your profile picture to this path
    resumeLink: "https://drive.google.com/file/d/1xUqQexwx6uWGUsiKlwcbKXRF6ZBmh38J/view?usp=sharing",
    socialLinks: {
      github: "https://github.com/aijurist",
      linkedin: "https://www.linkedin.com/in/shanthosh-s-3a1930257/",
    },
  },

  hero: {
    greeting: "Hello, I'm",
    title: ["AI Engineer", "Full Stack Developer", "and Aspiring Entrepreneur"],
    ctaText: "Explore My Work",
    ctaLink: "#projects",
  },

  about: {
    heading: "About Me",
    paragraphs: [
      "Third year Computer Science Student at Rajalakshmi Engineering College working on Generative AI and AI Agents",
      "With a passion for innovation, I combine technical knowledge with practical implementation to solve complex problems. I'm constantly exploring new AI technologies and methodologies to push the boundaries of what's possible in the field.",
    ],
    skills: ["GenAI", "Machine Learning", "AI Agents", "Python", "Full Stack Development", "LLM Integration"],
    // Added missing properties
    interests: ["Artificial Intelligence", "Machine Learning", "Software Development", "Research", "Innovation"],
    description: "I am passionate about creating AI solutions that make a meaningful impact. My goal is to bridge the gap between advanced AI research and practical applications, building tools and systems that solve real-world problems efficiently.",
  },

  projects: {
    heading: "Featured Projects",
    githubFeaturedRepos: [
      "Hotel-Booking", 
      "project-two", 
      "project-three", 
      "project-four"
    ],
    // These will be replaced with your actual top repos
  },

  skills: {
    heading: "Skills & Technologies",
    categories: [
      {
        name: "Programming Languages",
        skills: ["Python", "JavaScript", "TypeScript", "SQL"]
      },
      {
        name: "AI & ML",
        skills: ["Langchain", "LangGraph", "TensorFlow", "Scikit-Learn", "Generative AI", "LLM Fine-tuning"]
      },
      {
        name: "Frameworks & Libraries",
        skills: ["FastAPI", "Flask", "Django", "React", "Polars"]
      },
      {
        name: "Tools & Platforms",
        skills: ["Docker", "Apache Spark", "Git", "Cloud Platforms"]
      }
    ],
    // Added missing properties
    technical: ["Python", "Machine Learning", "LLM Integration", "React", "FastAPI", "Docker", "TensorFlow", "GenAI"]
  },

  experience: {
    heading: "Experience",
    items: [
      {
        title: "AI Research Intern",
        company: "XYZ AI Labs",
        duration: "May 2023 - Present",
        description: [
          "Developed and optimized transformer-based models for NLP tasks",
          "Implemented distributed training pipelines for large language models",
          "Built AI agents for automated data processing workflows"
        ]
      },
      {
        title: "Machine Learning Engineer",
        company: "ABC Tech",
        duration: "Jan 2023 - Apr 2023",
        description: [
          "Designed and deployed ML models for predictive analytics",
          "Created modular AI pipelines for data processing",
          "Optimized model inference performance by 40%"
        ]
      }
    ],
    0: {
      company: "XYZ AI Labs",
      role: "AI Research Intern",
      period: "May 2023 - Present"
    },
    1: {
      company: "ABC Tech",
      role: "Machine Learning Engineer",
      period: "Jan 2023 - Apr 2023"
    },
    slice: function(this: { [key: string]: any }, start: any, end: number): any[] {
      const result = [];
      for (let i = start; i < end && i < Object.keys(this).length - 1; i++) {
        if (this[i]) result.push(this[i]);
      }
      return result;
    }
  },

  contact: {
    heading: "Get In Touch",
    message: "Interested in collaborating on AI projects or have questions about my work? Feel free to reach out!",
    ctaText: "Send Email",
    ctaIcon: "mail",
    email: "shanthosh811@gmail.com"
  },

  theme: {
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#888888"
    },
    fonts: {
      heading: "Space Grotesk, sans-serif",
      body: "Inter, sans-serif"
    }
  },

  seo: {
    title: "Shanthosh S | AI Engineer",
    description: "Portfolio of Shanthosh S - AI Engineer and Full Stack Developer specializing in Generative AI and Machine Learning",
    keywords: "AI, Machine Learning, Generative AI, LLM, Python, React, Full Stack Development",
    author: "Shanthosh S",
    url: "https://yourportfolio.com",
    image: "/assets/images/og-image.jpg"
  },

  github: {
    username: "aijurist",
    token: import.meta.env.VITE_GITHUB_TOKEN || "",
    featuredRepos: 4,
    showLanguages: true,
    showContributions: true
  },

  animations: {
    enable: true,
    duration: 0.5,
    easing: "easeInOut"
  },
};

export default portfolioConfig;