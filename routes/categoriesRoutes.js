const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../helpers/validateToken');
const { createCategory,
  getCategories } = require('../controllers/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.post('/', rescue(validateToken, createCategory));
categoriesRouter.get('/', rescue(validateToken, getCategories));

module.exports = categoriesRouter;