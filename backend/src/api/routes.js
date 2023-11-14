const express = require('express');
const router = express.Router();
const controllers = require('./api/controllers');
const authMiddleware = require('./services/authService').authMiddleware;

// Authentication routes
router.post('/api/auth/login', controllers.login);
router.post('/api/auth/register', controllers.register);

// Butler/Consigliere routes
router.get('/api/butler/tasks', authMiddleware, controllers.getButlerTasks);
router.post('/api/butler/task', authMiddleware, controllers.createButlerTask);

// The Arena routes
router.get('/api/arena/games', authMiddleware, controllers.getGames);
router.post('/api/arena/game', authMiddleware, controllers.createGame);

// Automation Station routes
router.get('/api/automation/scripts', authMiddleware, controllers.getAutomationScripts);
router.post('/api/automation/script', authMiddleware, controllers.createAutomationScript);

// Marketplace routes
router.get('/api/marketplace/items', authMiddleware, controllers.getMarketplaceItems);
router.post('/api/marketplace/item', authMiddleware, controllers.createMarketplaceItem);

// Converging Paths routes
router.get('/api/convergingpaths/experiences', authMiddleware, controllers.getConvergingPathsExperiences);
router.post('/api/convergingpaths/experience', authMiddleware, controllers.createConvergingPathsExperience);

// Metarealms Clash routes
router.get('/api/metarealmsclash/games', authMiddleware, controllers.getMetarealmsClashGames);
router.post('/api/metarealmsclash/game', authMiddleware, controllers.createMetarealmsClashGame);

// NFT routes
router.get('/api/nfts', authMiddleware, controllers.getNFTs);
router.post('/api/nfts/transfer', authMiddleware, controllers.transferNFT);

module.exports = router;