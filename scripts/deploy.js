const { ethers } = require("hardhat");
const hre = require("hardhat");

const vrfCoordinatorV2 = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
const entranceFee = ethers.utils.parseEther("0.01");
const gasLane = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
const subscriptionId = 9802;
const callbackGasLimit = 500000;

async function main() {

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(vrfCoordinatorV2,entranceFee,gasLane,subscriptionId,callbackGasLimit);

  await lottery.deployed();
  await lottery.deployTransaction.wait()

  console.log(
    `Lottery deployed to ${lottery.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
