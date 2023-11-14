const Joi = require('joi');

const UserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  authToken: Joi.string(),
  userProfile: Joi.object({
    bio: Joi.string().max(500),
    interests: Joi.array().items(Joi.string()),
    birthdate: Joi.date()
  }),
  gameState: Joi.object({
    currentLevel: Joi.number(),
    highScore: Joi.number()
  }),
  automationScripts: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    script: Joi.string().required()
  })),
  nftAssets: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    owner: Joi.string().required(),
    tokenId: Joi.string().required()
  }))
});

const validateUser = (userData) => {
  const { error } = UserSchema.validate(userData);
  return error ? error.details[0].message : null;
};

const GameSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  multiplayer: Joi.boolean(),
  state: Joi.string().valid('active', 'inactive', 'maintenance')
});

const validateGame = (gameData) => {
  const { error } = GameSchema.validate(gameData);
  return error ? error.details[0].message : null;
};

const AutomationSchema = Joi.object({
  name: Joi.string().required(),
  triggerEvent: Joi.string().required(),
  actions: Joi.array().items(Joi.string()).required()
});

const validateAutomation = (automationData) => {
  const { error } = AutomationSchema.validate(automationData);
  return error ? error.details[0].message : null;
};

const MarketplaceItemSchema = Joi.object({
  itemId: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  description: Joi.string().required(),
  sellerId: Joi.string().required()
});

const validateMarketplaceItem = (itemData) => {
  const { error } = MarketplaceItemSchema.validate(itemData);
  return error ? error.details[0].message : null;
};

const NFTSchema = Joi.object({
  tokenId: Joi.string().required(),
  assetName: Joi.string().required(),
  owner: Joi.string().required(),
  metadata: Joi.object({
    image: Joi.string().uri(),
    attributes: Joi.array().items(Joi.object())
  })
});

const validateNFT = (nftData) => {
  const { error } = NFTSchema.validate(nftData);
  return error ? error.details[0].message : null;
};

module.exports = {
  validateUser,
  validateGame,
  validateAutomation,
  validateMarketplaceItem,
  validateNFT
};