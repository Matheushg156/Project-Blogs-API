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

module.exports = {
  createCategory,
};