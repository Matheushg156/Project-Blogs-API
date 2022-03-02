const express = require('express');

const validateToken = require('../helpers/validateToken');
const { createCategory,
  getCategories } = require('../controllers/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.post('/', validateToken, createCategory);
categoriesRouter.get('/', validateToken, getCategories);

module.exports = categoriesRouter;