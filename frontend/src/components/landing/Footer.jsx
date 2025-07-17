import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter } from 'lucide-react';

const Footer = ({ openLink, externalLinks }) => {
  return (
    <footer className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-8">
            <Link to="/docs" className="text-text hover:text-accent transition-colors duration-200">
              Docs
            </Link>
            <button onClick={() => openLink(externalLinks.whitepaper)} className="text-text hover:text-accent transition-colors duration-200">
              Whitepaper
            </button>
            <button onClick={() => openLink(externalLinks.twitter)} className="text-text hover:text-accent transition-colors duration-200 flex items-center">
              <Twitter className="w-4 h-4 mr-1.5" />
              X
            </button>
            <button onClick={() => openLink(externalLinks.github)} className="text-text hover:text-accent transition-colors duration-200 flex items-center">
              <Github className="w-4 h-4 mr-1.5" />
              GitHub
            </button>
          </div>
          <p className="text-text text-sm text-center md:text-left">
            © 2025 CertiKad Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;