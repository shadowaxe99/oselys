const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { authToken } = require('../config');

const authService = {
  register: async (userData) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = new UserModel({
        ...userData,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      return { success: true, user: savedUser };
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      };

      const token = jwt.sign(payload, authToken, { expiresIn: '1h' });
      return { success: true, token: `Bearer ${token}` };
    } catch (error) {
      throw error;
    }
  },

  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), authToken);
      return { success: true, decoded };
    } catch (error) {
      return { success: false, message: 'Invalid token' };
    }
  },
};

module.exports = authService;