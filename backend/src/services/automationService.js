const { AutomationSchema } = require('../models/automationModel');
const mongoose = require('mongoose');

const Automation = mongoose.model('Automation', AutomationSchema);

const createAutomationTask = async (userId, taskData) => {
  try {
    const newTask = new Automation({
      owner: userId,
      ...taskData
    });
    await newTask.save();
    return newTask;
  } catch (error) {
    throw new Error('Error creating automation task: ' + error.message);
  }
};

const getAutomationTasksByUser = async (userId) => {
  try {
    const tasks = await Automation.find({ owner: userId });
    return tasks;
  } catch (error) {
    throw new Error('Error retrieving automation tasks: ' + error.message);
  }
};

const updateAutomationTask = async (taskId, updateData) => {
  try {
    const updatedTask = await Automation.findByIdAndUpdate(taskId, updateData, { new: true });
    return updatedTask;
  } catch (error) {
    throw new Error('Error updating automation task: ' + error.message);
  }
};

const deleteAutomationTask = async (taskId) => {
  try {
    const deletedTask = await Automation.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (error) {
    throw new Error('Error deleting automation task: ' + error.message);
  }
};

module.exports = {
  createAutomationTask,
  getAutomationTasksByUser,
  updateAutomationTask,
  deleteAutomationTask
};