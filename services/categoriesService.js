const { Categories } = require('../models');

const createCategory = async (categoryInfos) => {
  try {
    const { name } = categoryInfos;
    const category = await Categories.create({ name });
    return category;
  } catch (error) {
    return error;
  }
};

const getCategories = async () => {
  try {
    const categories = await Categories.findAll();
    return categories;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createCategory,
  getCategories,
};