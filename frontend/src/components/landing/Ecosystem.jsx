import React from 'react';
import { Globe, TrendingUp, DollarSign, Users } from 'lucide-react';

const ecosystemCards = [
  {
    icon: <Globe className="w-7 h-7 text-accent" />,
    title: 'Merit-Based Marketplace',
    description: 'A global talent market where verifiable skill, not just claims, determines visibility and value.',
    alt: "Icon of a globe for Merit-Based Marketplace"
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-accent" />,
    title: 'High-Integrity Recruitment',
    description: 'Allow top firms to source talent with cryptographically proven track records, reducing hiring risk and time.',
    alt: "Icon of a trending up chart for High-Integrity Recruitment"
  },
  {
    icon: <DollarSign className="w-7 h-7 text-accent" />,
    title: 'Reputation-Backed DeFi',
    description: 'Your CertiKad Score acts as a measure of your creditworthiness, unlocking access to capital and insurance.',
    alt: "Icon of a dollar sign for Reputation-Backed DeFi"
  },
  {
    icon: <Users className="w-7 h-7 text-accent" />,
    title: 'Trustless Team Formation',
    description: 'Assemble a "cadre" of verified professionals for high-stakes projects, governed by transparent smart contracts.',
    alt: "Icon of users for Trustless Team Formation"
  },
];

const Ecosystem = () => {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-heading mb-4">An Economy of Verified Professionals</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {ecosystemCards.map((card) => (
            <div
              key={card.title}
              className="p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-start space-x-6"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center" role="img" aria-label={card.alt}>
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-heading mb-3">{card.title}</h3>
                <p className="text-text leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;