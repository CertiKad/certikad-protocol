async function main() {
  const CertiKad = await ethers.getContractFactory("CertiKadCredential");
  const certikad = await CertiKad.deploy();
  await certikad.waitForDeployment();
  console.log("Deployed to:", await certikad.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});