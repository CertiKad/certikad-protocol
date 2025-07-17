import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = ({ scrollToSection, openLink, externalLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollAndCloseMenu = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };
  
  const navLinks = [
    { label: 'The Problem', id: 'problem' },
    { label: 'The Framework', id: 'framework' },
    { label: 'Ecosystem', id: 'ecosystem' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/d90487c8-48ff-4ef8-aad2-e2b5fbccf4e9/c3a743cbb7741688246922842aa66266.webp" alt="CertiKad Shield Logo" className="h-10 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-text hover:text-accent transition-colors duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => openLink(externalLinks.github)} className="text-text hover:text-accent transition-colors duration-200 font-medium">
              GitHub
            </button>
            <Button onClick={() => openLink(externalLinks.discord)} className="bg-accent hover:bg-accent/90 text-white px-6">
              Join Community
            </Button>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <div className={`h-0.5 bg-heading transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`h-0.5 bg-heading transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`h-0.5 bg-heading transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollAndCloseMenu(link.id)}
                  className="text-left text-text hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => { openLink(externalLinks.github); setIsMenuOpen(false); }} className="text-left text-text hover:text-accent transition-colors duration-200">
                GitHub
              </button>
              <Button onClick={() => { openLink(externalLinks.discord); setIsMenuOpen(false); }} className="bg-accent hover:bg-accent/90 text-white w-full mt-2">
                Join Community
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;