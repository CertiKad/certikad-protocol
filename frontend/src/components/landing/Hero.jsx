import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BadgeCheck } from 'lucide-react';

const Hero = ({ navigateTo, externalLinks }) => {
  return (
    <section className="relative bg-white pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-light opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/d90487c8-48ff-4ef8-aad2-e2b5fbccf4e9/c3a743cbb7741688246922842aa66266.webp"
            alt="CertiKad Shield Logo"
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight leading-tight">
            The Standard for <br />
            <span className="text-accent">Verifiable Professional Merit</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg lg:text-xl text-text">
            CertiKad is a decentralized protocol unifying institutional credentials with proven work history into a single, on-chain ledger. Own your career, prove your value.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto text-lg bg-accent hover:bg-accent/90 text-white shadow-lg transition-transform transform hover:scale-105"
            onClick={() => navigateTo('/gallery')}
          >
            <BadgeCheck className="mr-2 h-5 w-5" />
            Get Verified
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 shadow-lg transition-transform transform hover:scale-105"
            onClick={() => window.open(externalLinks.whitepaper, '_blank', 'noopener,noreferrer')}
          >
            Read Whitepaper
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;