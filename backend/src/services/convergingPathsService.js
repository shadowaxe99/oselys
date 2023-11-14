const mongoose = require('mongoose');
const ConvergingPathsModel = require('../models/convergingPathsModel');

const createVirtualExperience = async (experienceData) => {
  try {
    const newExperience = new ConvergingPathsModel(experienceData);
    const savedExperience = await newExperience.save();
    return savedExperience;
  } catch (error) {
    throw error;
  }
};

const updateVirtualExperience = async (experienceId, updateData) => {
  try {
    const updatedExperience = await ConvergingPathsModel.findByIdAndUpdate(
      experienceId,
      updateData,
      { new: true }
    );
    return updatedExperience;
  } catch (error) {
    throw error;
  }
};

const getVirtualExperience = async (experienceId) => {
  try {
    const experience = await ConvergingPathsModel.findById(experienceId);
    return experience;
  } catch (error) {
    throw error;
  }
};

const deleteVirtualExperience = async (experienceId) => {
  try {
    const deletedExperience = await ConvergingPathsModel.findByIdAndDelete(experienceId);
    return deletedExperience;
  } catch (error) {
    throw error;
  }
};

const listVirtualExperiences = async () => {
  try {
    const experiences = await ConvergingPathsModel.find({});
    return experiences;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createVirtualExperience,
  updateVirtualExperience,
  getVirtualExperience,
  deleteVirtualExperience,
  listVirtualExperiences
};