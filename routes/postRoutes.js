const express = require('express');

const validateToken = require('../helpers/validateToken');
const { validateCategoriesId, createBlogPost, 
  getAllBlogPosts, getBlogPostById } = require('../controllers/blogPostsController');

const postRouter = express.Router();

postRouter.post('/', validateToken, validateCategoriesId, createBlogPost);
postRouter.get('/', validateToken, getAllBlogPosts);
postRouter.get('/:id', validateToken, getBlogPostById);

module.exports = postRouter;