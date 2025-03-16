/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import portfolioConfig from '../../config/portfolio-config';

interface ContactProps {
  theme: string;
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const isDark = theme === 'dark';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulating form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Replace this with actual form submission logic
      console.log('Form submitted:', formData);
      
      setSubmitStatus({
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

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

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      className={`w-full py-24 lg:py-32 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="text-left mb-14">
            <motion.h2 
              variants={itemVariants}
              className={`font-sirin text-4xl sm:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}
            >
              Get In Touch
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className={`text-base sm:text-lg max-w-2xl ${isDark ? 'text-white/80' : 'text-black/80'}`}
            >
              Feel free to reach out for collaborations, opportunities, or just to say hello!
            </motion.p>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:gap-16">
            {/* Contact Form */}
            <motion.div 
              variants={formVariants}
              className="w-full lg:w-3/5 mb-12 lg:mb-0"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'bg-white/5 border border-white/10 text-white focus:border-green-500' 
                        : 'bg-black/5 border border-black/10 text-black focus:border-green-600'
                    } outline-none transition-all duration-200 hover:border-green-400`}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'bg-white/5 border border-white/10 text-white focus:border-green-500' 
                        : 'bg-black/5 border border-black/10 text-black focus:border-green-600'
                    } outline-none transition-all duration-200 hover:border-green-400`}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'bg-white/5 border border-white/10 text-white focus:border-green-500' 
                        : 'bg-black/5 border border-black/10 text-black focus:border-green-600'
                    } outline-none transition-all duration-200 hover:border-green-400`}
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-full font-medium text-sm ${
                    isDark 
                      ? 'bg-white text-black hover:bg-white/90' 
                      : 'bg-black text-white hover:bg-black/90'
                  } transition-colors duration-300 shadow-lg`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
                
                {submitStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 px-4 py-3 rounded-lg ${
                      submitStatus.success 
                        ? isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800'
                        : isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-2/5 lg:pl-8"
            >
              <div className="mb-10">
                <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                  Contact Information
                </h3>
                <p className={`text-sm mb-6 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                  Prefer to reach out directly? Here's how you can contact me.
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Email */}
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isDark ? 'bg-white/10' : 'bg-black/10'
                  }`}>
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
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className='my-auto'>
                    <h4 className={`text-sm font-medium ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                      Email
                    </h4>
                    <a 
                      href={`mailto:${portfolioConfig.personal.email}`}
                      className={`text-sm font-medium ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'} transition-colors`}
                    >
                      {portfolioConfig.personal.email}
                    </a>
                  </div>
                </motion.div>
                
                {/* Location */}
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isDark ? 'bg-white/10' : 'bg-black/10'
                  }`}>
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
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className='my-auto'>
                    <h4 className={`text-sm font-medium ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                      Location
                    </h4>
                    <p className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                      {portfolioConfig.personal.location || 'San Francisco, CA'}
                    </p>
                  </div>
                </motion.div>
                </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;