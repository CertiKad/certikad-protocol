
import React, { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertTriangle } from "lucide-react";

const CONTRACT_ADDRESS = "0x795b6001f55Eb14F87f543c830Efa34D00C948d5";
const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function totalSupply() view returns (uint256)",
  "event CredentialIssued(uint256 indexed tokenId, address indexed to, string ipfsURI)"
];

const SUPPORTED_CHAINS = {
  '1': 'Ethereum Mainnet',
  '11155111': 'Sepolia Testnet',
  '137': 'Polygon Mainnet',
  '80002': 'Polygon Amoy Testnet'
};

const GalleryHeader = () => (
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

const NFTCard = ({ nft }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col"
  >
    <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />
    <div className="p-6 flex-grow flex flex-col">
      <h2 className="text-xl font-bold text-heading mb-2">{nft.name}</h2>
      <p className="text-text mb-4 flex-grow">{nft.description}</p>
      <ul className="space-y-2 mb-4">
        {nft.attributes && nft.attributes.map((attr, i) => (
          <li key={i} className="text-sm">
            <strong className="text-heading">{attr.trait_type}:</strong> <span className="text-text">{attr.value}</span>
          </li>
        ))}
      </ul>
      <small className="text-gray-400 mt-auto pt-4 border-t border-gray-100">Token ID: {nft.tokenId}</small>
    </div>
  </motion.div>
);

export default function GalleryPage() {
  const [address, setAddress] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      setAddress("");
      setNfts([]);
      setError("");
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } else if (accounts[0] !== address) {
      setAddress(accounts[0]);
    }
  }, [address, toast]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', () => window.location.reload());
      }
    };
  }, [handleAccountsChanged]);

  async function connectWallet() {
    if (!window.ethereum) {
      toast({
        variant: "destructive",
        title: "MetaMask Not Found",
        description: "Please install the MetaMask browser extension to connect your wallet.",
      });
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
      toast({
        title: "Wallet Connected!",
        description: `Connected as: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "The wallet connection was cancelled or failed.",
      });
    }
  }

  const fetchNFTs = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError("");
    setNfts([]);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const chainId = network.chainId.toString();

      if (!SUPPORTED_CHAINS[chainId]) {
        setError(`Unsupported Network. Please switch to one of the following: ${Object.values(SUPPORTED_CHAINS).join(', ')}.`);
        setLoading(false);
        return;
      }
      
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      
      const balance = await contract.balanceOf(address);
      console.log(`User has ${balance.toString()} credentials`);
      
      if (balance.toString() === "0") {
        setLoading(false);
        return;
      }

      const promises = [];
      for (let i = 0; i < balance; i++) {
        promises.push(
          (async () => {
            try {
              const tokenId = await contract.tokenOfOwnerByIndex(address, i);
              let tokenURI = await contract.tokenURI(tokenId);
              
              if (tokenURI.startsWith("ipfs://")) {
                tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
              }
              
              const response = await fetch(tokenURI);
              const meta = await response.json();
              
              if (meta.image && meta.image.startsWith("ipfs://")) {
                meta.image = meta.image.replace("ipfs://", "https://ipfs.io/ipfs/");
              }
              
              return { tokenId: tokenId.toString(), ...meta };
            } catch (e) {
              console.error(`Error fetching token at index ${i}:`, e);
              return null;
            }
          })()
        );
      }

      const resolvedTokens = await Promise.all(promises);
      const validTokens = resolvedTokens.filter(t => t !== null);
      setNfts(validTokens);

    } catch (err) {
      console.error("Failed to fetch NFTs:", err);
      setError("Could not fetch credentials.");
    } finally {
      setLoading(false);
    }
  }, [address]);


  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return (
    <>
      <Helmet>
        <title>Credential Gallery | CertiKad</title>
        <meta name="description" content="View and verify your on-chain professional credentials with CertiKad." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <GalleryHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-4">Credential Gallery</h1>
            <p className="text-lg text-text max-w-3xl mx-auto mb-8">Connect your wallet to view your verified on-chain credentials powered by CertiKad.</p>
            
            {!address && (
              <Button onClick={connectWallet} size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Connect Wallet
              </Button>
            )}

            {address && (
              <div className="text-sm text-text bg-white border border-gray-200 rounded-lg px-4 py-2 inline-block">
                Connected: <strong className="text-heading">{`${address.slice(0, 6)}...${address.slice(-4)}`}</strong>
              </div>
            )}
          </motion.div>

          <div className="mt-16">
            {loading && (
              <div className="flex justify-center items-center space-x-2 text-text">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="text-lg">Loading your credentials...</span>
              </div>
            )}

            {error && (
              <div className="flex flex-col justify-center items-center space-y-4 text-red-600 bg-red-100 border border-red-300 rounded-lg p-4">
                <AlertTriangle className="h-8 w-8" />
                <span className="text-lg text-center font-semibold">{error}</span>
                <Button variant="destructive" size="sm" onClick={fetchNFTs}>Try Again</Button>
              </div>
            )}

            {!loading && !error && address && nfts.length === 0 && (
              <div className="text-center text-text py-12">
                <h3 className="text-2xl font-bold text-heading mb-2">No Credentials Found</h3>
                <p>This wallet does not hold any CertiKad credentials yet on the current network.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nfts.map(nft => (
                <NFTCard key={nft.tokenId} nft={nft} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
