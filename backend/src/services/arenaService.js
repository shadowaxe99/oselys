const GameModel = require('../models/gameModel');
const { GAME_EVENT } = require('../utils/messageNames');

const arenaService = {
  /**
   * Initialize a new game session for a user.
   * @param {string} userId - The ID of the user starting the game.
   * @returns {Promise<Object>} The game state object.
   */
  initializeGame: async (userId) => {
    try {
      const newGame = new GameModel({
        userId,
        state: 'INITIALIZED',
        players: [userId],
        createdAt: new Date(),
      });

      await newGame.save();
      return newGame;
    } catch (error) {
      console.error('Error initializing game:', error);
      throw error;
    }
  },

  /**
   * Join an existing game session.
   * @param {string} gameId - The ID of the game to join.
   * @param {string} userId - The ID of the user joining the game.
   * @returns {Promise<Object>} The updated game state object.
   */
  joinGame: async (gameId, userId) => {
    try {
      const game = await GameModel.findById(gameId);
      if (!game) {
        throw new Error('Game not found');
      }

      if (game.players.includes(userId)) {
        throw new Error('User already in the game');
      }

      game.players.push(userId);
      await game.save();
      return game;
    } catch (error) {
      console.error('Error joining game:', error);
      throw error;
    }
  },

  /**
   * Handle game events such as moves or actions by a player.
   * @param {string} gameId - The ID of the game.
   * @param {string} userId - The ID of the user making the move.
   * @param {Object} event - The game event object.
   * @returns {Promise<Object>} The updated game state object.
   */
  handleGameEvent: async (gameId, userId, event) => {
    try {
      const game = await GameModel.findById(gameId);
      if (!game) {
        throw new Error('Game not found');
      }

      if (!game.players.includes(userId)) {
        throw new Error('User not part of the game');
      }

      // Process the event based on its type
      switch (event.type) {
        case GAME_EVENT.MOVE:
          // Handle move event
          break;
        case GAME_EVENT.ACTION:
          // Handle action event
          break;
        // Add more cases as needed
        default:
          throw new Error('Unknown game event type');
      }

      await game.save();
      return game;
    } catch (error) {
      console.error('Error handling game event:', error);
      throw error;
    }
  },

  /**
   * End a game session.
   * @param {string} gameId - The ID of the game to end.
   * @returns {Promise<Object>} The final game state object.
   */
  endGame: async (gameId) => {
    try {
      const game = await GameModel.findById(gameId);
      if (!game) {
        throw new Error('Game not found');
      }

      game.state = 'ENDED';
      game.endedAt = new Date();
      await game.save();
      return game;
    } catch (error) {
      console.error('Error ending game:', error);
      throw error;
    }
  },
};

module.exports = arenaService;