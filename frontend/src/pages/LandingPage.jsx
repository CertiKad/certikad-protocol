
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Framework from '@/components/landing/Framework';
import Ecosystem from '@/components/landing/Ecosystem';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';

function LandingPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const showToast = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const externalLinks = {
    github: 'https://github.com/CertiKad/certikad-protocol',
    whitepaper: 'https://mirror.xyz/ironmikej.eth/0tWgRW3-Hb_DfXkZwCSJybtaNo03lWNW2oIRusrD4fw',
    discord: 'https://discord.gg/eyT2k2Ex',
    twitter: 'https://x.com/CertiKad',
  };

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <Helmet>
        <title>CertiKad | The Standard for Verifiable Professional Merit</title>
        <meta
          name="description"
          content="CertiKad is a decentralized protocol unifying institutional credentials with proven work history into a single, on-chain ledger. Own your career and prove your value."
        />
        <link rel="icon" type="image/webp" href="https://storage.googleapis.com/hostinger-horizons-assets-prod/d90487c8-48ff-4ef8-aad2-e2b5fbccf4e9/c3a743cbb7741688246922842aa66266.webp" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-text">
        <Header scrollToSection={scrollToSection} openLink={openLink} externalLinks={externalLinks} />
        <main>
          <Hero openLink={openLink} navigateTo={navigateTo} externalLinks={externalLinks} />
          <AnimatedSection id="problem">
            <Problem />
          </AnimatedSection>
          <AnimatedSection id="framework">
            <Framework />
          </AnimatedSection>
          <AnimatedSection id="ecosystem">
            <Ecosystem />
          </AnimatedSection>
          <AnimatedSection>
            <CTA openLink={openLink} externalLinks={externalLinks} />
          </AnimatedSection>
        </main>
        <Footer openLink={openLink} externalLinks={externalLinks} />
      </div>
    </>
  );
}

export default LandingPage;
