import React from 'react';

const OpaqueCredentialsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <circle cx="11.5" cy="14.5" r="2.5"></circle>
    <line x1="13" y1="16" x2="17" y2="20"></line>
  </svg>
);

const CaptiveReputationsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ExperienceGapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
    <path d="M19 13.33V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v8.33"></path>
    <path d="M5 13.33h14v-1.66a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1.66z"></path>
    <path d="M22 19.67l-3.5-3.5"></path>
    <path d="M2 19.67l3.5-3.5"></path>
    <path d="M12 10v10"></path>
  </svg>
);

const problemItems = [
  {
    icon: <OpaqueCredentialsIcon />,
    title: 'Opaque Credentials',
    alt: "Icon of a document with a magnifying glass for Opaque Credentials",
    description: 'Resumes are claims, not proof. Verifying skills is slow, costly, and riddled with inefficiency.',
  },
  {
    icon: <CaptiveReputationsIcon />,
    title: 'Captive Reputations',
    alt: "Icon of a lock for Captive Reputations",
    description: 'Your work history is held hostage by centralized platforms, locking you in and limiting your mobility.',
  },
  {
    icon: <ExperienceGapIcon />,
    title: 'The Experience Gap',
    alt: "Icon of a bridge for The Experience Gap",
    description: 'Formal degrees prove knowledge, but not experience. Freelance work proves experience, but lacks formal validation. Your professional value lies at the intersection of both, yet no system exists to bridge the gap.',
  },
  {
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    title: 'Fragmented Identity',
    alt: "Icon representing Fragmented Identity",
    description: 'Your professional identity is scattered across dozens of sites, with no single source of truth.',
  }
];

const Problem = () => {
  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">A Market Built on Ambiguity</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problemItems.map((item) => (
            <div
              key={item.title}
              className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6" role="img" aria-label={item.alt}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-heading mb-4">{item.title}</h3>
              <p className="text-text leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;