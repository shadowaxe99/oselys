const Web3 = require('web3');
const NFTContractABI = require('../contracts/NFTContractABI.json');
const { NFT_CONTRACT_ADDRESS, WEB3_PROVIDER_URL } = require('../config');

class BlockchainService {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
    this.nftContract = new this.web3.eth.Contract(NFTContractABI, NFT_CONTRACT_ADDRESS);
  }

  async transferOwnership(nftId, fromAddress, toAddress) {
    const transaction = this.nftContract.methods.transferFrom(fromAddress, toAddress, nftId);
    const gas = await transaction.estimateGas({ from: fromAddress });
    const gasPrice = await this.web3.eth.getGasPrice();
    const data = transaction.encodeABI();
    const nonce = await this.web3.eth.getTransactionCount(fromAddress, 'latest');

    const signedTx = await this.web3.eth.accounts.signTransaction({
      to: NFT_CONTRACT_ADDRESS,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: await this.web3.eth.net.getId()
    }, 'private_key_of_from_address'); // Replace with actual private key

    return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }

  async verifyOwnership(nftId, ownerAddress) {
    const owner = await this.nftContract.methods.ownerOf(nftId).call();
    return owner.toLowerCase() === ownerAddress.toLowerCase();
  }

  async mintNFT(toAddress, tokenURI) {
    const transaction = this.nftContract.methods.mint(toAddress, tokenURI);
    const gas = await transaction.estimateGas({ from: toAddress });
    const gasPrice = await this.web3.eth.getGasPrice();
    const data = transaction.encodeABI();
    const nonce = await this.web3.eth.getTransactionCount(toAddress, 'latest');

    const signedTx = await this.web3.eth.accounts.signTransaction({
      to: NFT_CONTRACT_ADDRESS,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: await this.web3.eth.net.getId()
    }, 'private_key_of_to_address'); // Replace with actual private key

    return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }
}

module.exports = BlockchainService;