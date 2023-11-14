const authService = require('../services/authService');
const butlerService = require('../services/butlerService');
const arenaService = require('../services/arenaService');
const automationService = require('../services/automationService');
const marketplaceService = require('../services/marketplaceService');
const convergingPathsService = require('../services/convergingPathsService');
const metarealmsClashService = require('../services/metarealmsClashService');
const errorHandler = require('../utils/errorHandler');

const controllers = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.status(200).json({ authToken: token });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async register(req, res) {
    try {
      const { email, password, username } = req.body;
      const user = await authService.register(email, password, username);
      res.status(201).json({ userProfile: user });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async getButlerServices(req, res) {
    try {
      const { authToken } = req.headers;
      const services = await butlerService.getServices(authToken);
      res.status(200).json(services);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async getArenaGames(req, res) {
    try {
      const games = await arenaService.getGames();
      res.status(200).json({ gameState: games });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async createAutomationTask(req, res) {
    try {
      const { authToken, automationScript } = req.body;
      const task = await automationService.createTask(authToken, automationScript);
      res.status(201).json(task);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async getMarketplaceItems(req, res) {
    try {
      const items = await marketplaceService.getItems();
      res.status(200).json({ marketplaceItems: items });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async getConvergingPathsExperiences(req, res) {
    try {
      const experiences = await convergingPathsService.getExperiences();
      res.status(200).json(experiences);
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async getMetarealmsClashState(req, res) {
    try {
      const state = await metarealmsClashService.getGameState();
      res.status(200).json({ gameState: state });
    } catch (error) {
      errorHandler(res, error);
    }
  }
};

module.exports = controllers;