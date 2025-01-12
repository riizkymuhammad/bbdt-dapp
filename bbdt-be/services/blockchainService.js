const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/YOUR_PROJECT_ID'));

const contractABI = [ /* ABI from compiled smart contract */ ];
const contractAddress = '0xYourContractAddress';
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function createCaseByNeedy(description, targetAmount) {
    const accounts = await web3.eth.getAccounts();
    return await contract.methods.createCase(description, targetAmount).send({ from: accounts[0] });
}

module.exports = { createCaseByNeedy }; 
