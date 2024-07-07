const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.deployContract("Upload");
  //const upload = await Upload.deploy();

  await Upload.waitForDeployment();

  console.log("Library deployed to:", Upload.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});