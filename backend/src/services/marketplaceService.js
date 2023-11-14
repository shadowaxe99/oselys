const mongoose = require('mongoose');
const MarketplaceItemSchema = require('../models/marketplaceModel');
const NFTSchema = require('../models/nftModel');
const errorHandler = require('../utils/errorHandler');

const MarketplaceItem = mongoose.model('MarketplaceItem', MarketplaceItemSchema);
const NFT = mongoose.model('NFT', NFTSchema);

const listMarketplaceItems = async () => {
  try {
    const items = await MarketplaceItem.find();
    return items;
  } catch (error) {
    throw errorHandler(error);
  }
};

const getMarketplaceItemById = async (itemId) => {
  try {
    const item = await MarketplaceItem.findById(itemId);
    return item;
  } catch (error) {
    throw errorHandler(error);
  }
};

const createMarketplaceItem = async (itemData) => {
  try {
    const newItem = new MarketplaceItem(itemData);
    const savedItem = await newItem.save();
    return savedItem;
  } catch (error) {
    throw errorHandler(error);
  }
};

const updateMarketplaceItem = async (itemId, updateData) => {
  try {
    const updatedItem = await MarketplaceItem.findByIdAndUpdate(itemId, updateData, { new: true });
    return updatedItem;
  } catch (error) {
    throw errorHandler(error);
  }
};

const deleteMarketplaceItem = async (itemId) => {
  try {
    const deletedItem = await MarketplaceItem.findByIdAndRemove(itemId);
    return deletedItem;
  } catch (error) {
    throw errorHandler(error);
  }
};

const purchaseNFT = async (nftId, buyerId) => {
  try {
    const nft = await NFT.findById(nftId);
    if (!nft) {
      throw new Error('NFT not found');
    }
    if (nft.owner === buyerId) {
      throw new Error('Buyer already owns this NFT');
    }
    nft.owner = buyerId;
    const updatedNFT = await nft.save();
    return updatedNFT;
  } catch (error) {
    throw errorHandler(error);
  }
};

module.exports = {
  listMarketplaceItems,
  getMarketplaceItemById,
  createMarketplaceItem,
  updateMarketplaceItem,
  deleteMarketplaceItem,
  purchaseNFT
};