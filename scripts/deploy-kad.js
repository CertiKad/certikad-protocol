const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying KAD token with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const KAD = await ethers.getContractFactory("KAD");
  const kad = await KAD.deploy();
  await kad.waitForDeployment();

  console.log("KAD token deployed to:", await kad.getAddress());
  console.log("Treasury address:", await kad.treasury());
  console.log("Total supply:", ethers.formatEther(await kad.totalSupply()));
  console.log("Initial holder balance:", ethers.formatEther(
    await kad.balanceOf("0xF3fF97272973Ca4db72e596636eD6E94a6748112")
  ));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});