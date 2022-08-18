const hre = require("hardhat");

async function main() {
    const INVOICE = await hre.ethers.getContractFactory("INVOICE_LEDGER");
    const invoice = await INVOICE.deploy();

    await invoice.deployed();

    console.log("smart contract deployed at:", invoice.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
