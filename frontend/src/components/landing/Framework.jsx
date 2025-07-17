import React from 'react';

const ForgeLedgerIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M15.5 2.5a2.5 2.5 0 0 1 5 0V12a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1V2.5a2.5 2.5 0 0 1 5 0z" />
        <path d="M12 13V21" />
        <path d="M6 13V21" />
        <path d="M18 13V21" />
    </svg>
);

const CertifyMeritIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const UnlockValueIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);


const frameworkSteps = [
  {
    icon: <ForgeLedgerIcon />,
    title: '1. Forge Your Ledger',
    alt: "Icon of a hammer for Forging Your Ledger",
    description: 'Engage in projects where milestones are verified and recorded as immutable credentials on your personal on-chain ledger.',
  },
  {
    icon: <CertifyMeritIcon />,
    title: '2. Certify Your Merit',
    alt: "Icon of a shield with a checkmark for Certifying Your Merit",
    description: 'Every credential contributes to your CertiKad Score—a dynamic, transparent measure of your proven expertise and reliability.',
  },
  {
    icon: <UnlockValueIcon />,
    title: '3. Unlock Your Value',
    alt: "Icon of gears for Unlocking Your Value",
    description: 'Use your high-integrity reputation to access premium opportunities, form elite teams, and qualify for novel financial services.',
  },
];

const Framework = () => {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">The CertiKad Framework</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
            {frameworkSteps.map((item) => (
              <div key={item.title} className="text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6" role="img" aria-label={item.alt}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-3">{item.title}</h3>
                  <p className="text-text leading-relaxed px-4">{item.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Framework;