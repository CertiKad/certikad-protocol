import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CTA = ({ openLink, externalLinks }) => {
  return (
    <section className="bg-heading text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Become a Founding Member
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
            CertiKad is an open-source protocol. Join our community to help build and govern the new standard for professional merit.
          </p>
          <Button
            onClick={() => openLink(externalLinks.discord)}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg font-semibold"
          >
            Join the Discord
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;