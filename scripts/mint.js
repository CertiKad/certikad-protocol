require("dotenv").config();
const hre = require("hardhat");

const CONTRACT = "0x795b6001f55Eb14F87f543c830Efa34D00C948d5";
const TOKEN_URI = "ipfs://bafkreifuvkby36we2zhp4rqqry5kxlnckwzq6qapytjptrbxjrdb5dsncu";

async function main() {
  const [issuer] = await hre.ethers.getSigners();
  const certikad = await hre.ethers.getContractAt("CertiKadCredential", CONTRACT);

  const tx = await certikad.issueCredential(
    "0xF3fF97272973Ca4db72e596636eD6E94a6748112",
    TOKEN_URI
  );
  await tx.wait();

  console.log("Credential minted! Tx:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});