const axios = require('axios');
const { authToken } = require('../config');

class ThirdPartyService {
  constructor() {
    this.calendarApi = 'https://calendar.example.com/api';
    this.messagingApi = 'https://messaging.example.com/api';
    this.productivityApi = 'https://productivity.example.com/api';
  }

  async syncCalendar(userId) {
    try {
      const response = await axios.get(`${this.calendarApi}/sync`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'User-ID': userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error syncing calendar:', error);
      throw error;
    }
  }

  async sendMessage(userId, messageContent) {
    try {
      const response = await axios.post(`${this.messagingApi}/send`, {
        userId,
        message: messageContent
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getTasks(userId) {
    try {
      const response = await axios.get(`${this.productivityApi}/tasks`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'User-ID': userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
}

module.exports = ThirdPartyService;