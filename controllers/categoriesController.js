const CategoriesServices = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await CategoriesServices.createCategory({ name });
  console.log('category', category);
  if (!category.errors) {
    return res.status(201).json(category);
  }
  res.status(400).json({ message: category.errors[0].message });
};

const getCategories = async (_req, res) => {
  const categories = await CategoriesServices.getCategories();
  if (!categories.errors) {
    return res.status(200).json(categories);
  }
  res.status(500).json({ message: categories.errors[0].message });
};

module.exports = {
  createCategory,
  getCategories,
};