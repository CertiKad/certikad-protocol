import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DocsHeader = () => (
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
        <Link to="/">
            <span className="font-medium text-text hover:text-accent transition-colors">
                &larr; Back to Home
            </span>
        </Link>
      </div>
    </div>
  </motion.header>
);

const DocsPage = () => {
  const docsContent = `# CertiKad Technical Documentation

## 1. Introduction

**CertiKad** is a decentralized standard and protocol for establishing a system-of-record for verifiable professional merit. It aggregates and unifies disparate credential types—both institutional and experiential—into a single, user-owned, on-chain ledger. CertiKad empowers individuals with a portable, holistic, and immutable professional record, while enabling recruiters and organizations to verify merit with cryptographic proof.

---

## 2. Protocol Architecture

### 2.1 Core Entities

- **UniversalProfessionalLedger (UPL):**  
  A self-sovereign, ERC-721-based identity contract representing a user’s unified professional record.
- **Credential Types:**  
  - *Institutional Credentials:* Issued by universities, corporations, or certification authorities as SBTs (Soulbound Tokens) or ERC-1155 tokens.
  - *Experiential Credentials:* Signed attestations from clients, employers, or DAOs, often linked to on-chain contract completions.
- **CertiKadScore:**  
  A dynamic, on-chain reputation metric calculated from all verified credentials.

### 2.2 Data Flow

1. **Credential Issuance:**  
   - Institutional issuers mint SBT/ERC-1155 credentials to a user’s UPL.
   - Experiential credentials are submitted as signed attestations, verified by oracles or contract events.
2. **Aggregation:**  
   - All credentials are indexed and referenced in the user’s UPL.
3. **Verification:**  
   - Recruiters or third parties can query the UPL for cryptographic proof of credentials.
4. **Reputation Calculation:**  
   - The CertiKadScore is updated dynamically as new credentials are added or revoked.

---

## 3. Smart Contract Design

### 3.1 Identity Layer

- **ERC-721 UPL Contract:**  
  - Each user mints a unique, non-transferable ERC-721 token representing their ledger.
  - Ownership is self-sovereign; only the user can manage their ledger.

### 3.2 Credential Layer

- **ERC-1155 Credential Contracts:**  
  - Institutional issuers deploy ERC-1155 contracts for various credential types.
  - Credentials are minted to the user’s UPL address.
- **Signed Attestation Contracts:**  
  - Experiential credentials are submitted as EIP-712 signed messages.
  - Attestations are stored on-chain or referenced via IPFS/Arweave.

### 3.3 Account Abstraction

- **EIP-4337 Integration:**  
  - Enables smart contract wallets for users, allowing gasless transactions, meta-transactions, and programmable account logic.

### 3.4 Oracles & Verification

- **Chainlink Oracles:**  
  - Used for off-chain verification (e.g., confirming off-chain certifications, validating contract completions).
  - Oracles can trigger credential minting or attestation validation.

### 3.5 Storage

- **On-Chain:**  
  - Minimal metadata (hashes, pointers, credential IDs).
- **Off-Chain:**  
  - Credential documents, detailed metadata, and attestations stored on IPFS or Arweave.
  - On-chain references ensure immutability and verifiability.

---

## 4. Credential Types & Flows

### 4.1 Institutional Credentials

- **Format:** ERC-1155 or SBT
- **Issuers:** Universities, corporations, certification authorities
- **Process:**
  1. Issuer verifies user identity (off-chain KYC or on-chain proof).
  2. Credential minted to user’s UPL.
  3. Metadata includes issuer, credential type, date, and proof link.

### 4.2 Experiential Credentials

- **Format:** SignedAttestation (EIP-712)
- **Issuers:** Clients, employers, DAOs
- **Process:**
  1. Issuer signs an attestation referencing a completed contract or project.
  2. Attestation submitted to CertiKad contract.
  3. Oracle (if needed) verifies completion.
  4. Attestation is stored and referenced in the UPL.

---

## 5. CertiKadScore: Dynamic Reputation Metric

### 5.1 Calculation Logic

- **Inputs:**  
  - Institutional credentials (weight by issuer reputation, recency, type)
  - Experiential credentials (weight by issuer, project size, endorsements)
- **Algorithm:**  
  - Weighted sum with decay for outdated credentials.
  - Optional: ZK-proofs for privacy-preserving scoring.
- **Output:**  
  - Single score (0–1000), updated on-chain.

### 5.2 Privacy

- Users can choose to hide or reveal specific credentials.
- ZK-proofs (future roadmap) for selective disclosure.

---

## 6. Tokenomics

### 6.1 KAD Token

- **Standard:** ERC-20
- **Utilities:**
  - *Staking Access:* Stake KAD to unlock advanced features or credential slots.
  - *Governance Voting:* Participate in protocol upgrades and parameter changes.
  - *Dispute Resolution Bond:* Stake KAD to initiate or arbitrate disputes.
  - *Protocol Fee Payment:* Pay for premium services (e.g., advanced analytics, credential notarization).

---

## 7. APIs & SDKs

### 7.1 Public APIs

- **Query UPL:**  
  - Fetch all credentials, CertiKadScore, and metadata for a given address.
- **Verify Credential:**  
  - Validate credential authenticity and issuer signature.
- **Search Talent:**  
  - Filter users by skill, score, credential type, etc.

### 7.2 SDKs

- **JavaScript/TypeScript SDK:**  
  - For dApp integration, wallet plugins, and recruiter tools.
- **REST API:**  
  - For off-chain applications and enterprise integrations.

---

## 8. Security & Privacy

### 8.1 Threat Model

- **Credential Forgery:**  
  - Mitigated by cryptographic signatures and on-chain verification.
- **Sybil Attacks:**  
  - Mitigated by issuer whitelisting, KYC for institutional issuers, and staking requirements.
- **Data Leakage:**  
  - Minimal on-chain data; sensitive info stored off-chain with user-controlled access.

### 8.2 Audits

- All smart contracts to be audited by reputable third parties before mainnet launch.
- Ongoing bug bounty program.

---

## 9. Governance

- **DAO Structure:**  
  - KAD holders can propose and vote on protocol upgrades, parameter changes, and dispute resolutions.
- **Proposal Process:**  
  - Submit proposal → community discussion → on-chain vote → implementation.

---

## 10. Roadmap

- **Phase 1:** Protocol MVP, UPL contract, basic credential aggregation, KAD token launch
- **Phase 2:** Recruiter portal, advanced scoring, Chainlink oracle integration
- **Phase 3:** ZK-privacy features, enterprise integrations, DAO governance
- **Phase 4:** Global expansion, multi-chain support, open ecosystem

---

## 11. Community & Support

- **Website:** [certikad.io](https://certikad.io)
- **Litepaper:** [Link]
- **GitHub:** [GitHub]
- **Discord:** [Discord]
- **Socials:** [Twitter/LinkedIn/etc.]

---

## 12. Appendix

- **Standards Used:** ERC-721, ERC-1155, EIP-4337, EIP-712
- **Glossary:**  
  - *UPL:* UniversalProfessionalLedger  
  - *SBT:* Soulbound Token  
  - *KAD:* CertiKad protocol token  
  - *DAO:* Decentralized Autonomous Organization

---

**For further technical details, integration guides, or to contribute, visit our [GitHub](#) or join the community on [Discord](#).**
`;

  const renderMarkdown = (text) => {
    const externalLinks = {
      github: 'https://github.com/CertiKad/certikad-protocol',
      discord: 'https://discord.gg/eyT2k2Ex',
      whitepaper: 'https://mirror.xyz/ironmikej.eth/0tWgRW3-Hb_DfXkZwCSJybtaNo03lWNW2oIRusrD4fw'
    };

    const processLine = (line) => {
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[certikad\.io\]\(https:\/\/certikad\.io\)/g, `<a href="https://certikad.io" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">certikad.io</a>`)
        .replace(/\[GitHub\]\(#\)/g, `<a href="${externalLinks.github}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">GitHub</a>`)
        .replace(/\[Discord\]\(#\)/g, `<a href="${externalLinks.discord}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">Discord</a>`)
        .replace(/\[Link\]/g, `<a href="${externalLinks.whitepaper}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">Link</a>`)
        .replace(/\[GitHub\]/g, `<a href="${externalLinks.github}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">GitHub</a>`)
        .replace(/\[Discord\]/g, `<a href="${externalLinks.discord}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">Discord</a>`);
      
      return <span dangerouslySetInnerHTML={{ __html: processedLine }} />;
    };

    const lines = text.split('\n');
    const elements = [];
    let currentList = null;

    lines.forEach((line, i) => {
      if (line.startsWith('### ')) {
        currentList = null;
        elements.push(<h3 key={i} className="text-2xl font-bold text-heading mt-8 mb-4">{processLine(line.substring(4))}</h3>);
      } else if (line.startsWith('## ')) {
        currentList = null;
        elements.push(<h2 key={i} className="text-3xl font-bold text-heading mt-12 mb-6 pb-2 border-b border-gray-200">{processLine(line.substring(3))}</h2>);
      } else if (line.startsWith('# ')) {
        currentList = null;
        elements.push(<h1 key={i} className="text-5xl font-extrabold text-heading mb-8">{processLine(line.substring(2))}</h1>);
      } else if (line.trim().startsWith('- ')) {
        if (!currentList || currentList.type !== 'ul') {
          currentList = { type: 'ul', items: [] };
          elements.push(currentList);
        }
        currentList.items.push(line.substring(line.indexOf('- ') + 2));
      } else if (/^\d+\.\s/.test(line.trim())) {
        if (!currentList || currentList.type !== 'ol') {
          currentList = { type: 'ol', items: [] };
          elements.push(currentList);
        }
        currentList.items.push(line.substring(line.search(/\d+\.\s/) + 2));
      } else if (line.trim() === '---') {
        currentList = null;
        elements.push(<hr key={i} className="my-8 border-gray-200" />);
      } else if (line.trim() === '') {
        currentList = null;
        // We don't push <br /> for empty lines as it can create too much space. CSS handles margins.
      } else {
        currentList = null;
        elements.push(<p key={i} className="mb-4 leading-relaxed">{processLine(line)}</p>);
      }
    });

    return elements.map((el, i) => {
      if (React.isValidElement(el)) {
        return el;
      }
      if (el.type === 'ul') {
        return <ul key={i} className="list-disc pl-6 space-y-2 my-4">{el.items.map((item, j) => <li key={j}>{processLine(item)}</li>)}</ul>;
      }
      if (el.type === 'ol') {
        return <ol key={i} className="list-decimal pl-6 space-y-2 my-4">{el.items.map((item, j) => <li key={j}>{processLine(item)}</li>)}</ol>;
      }
      return null;
    });
  };

  return (
    <>
      <Helmet>
        <title>CertiKad Docs | Technical Documentation</title>
        <meta name="description" content="Official technical documentation for the CertiKad Protocol, detailing the architecture, smart contracts, and more." />
        <link rel="icon" type="image/webp" href="https://storage.googleapis.com/hostinger-horizons-assets-prod/d90487c8-48ff-4ef8-aad2-e2b5fbccf4e9/c3a743cbb7741688246922842aa66266.webp" />
      </Helmet>
      <div className="min-h-screen bg-white">
        <DocsHeader />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none text-text"
          >
            {renderMarkdown(docsContent)}
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default DocsPage;