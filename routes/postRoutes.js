const express = require('express');

const validateToken = require('../helpers/validateToken');
const { validateCategoriesId, createBlogPost, 
  getAllBlogPosts, getBlogPostById, validateUpdateBlogPost,
  userAuthorized, updateBlogPost } = require('../controllers/blogPostsController');

const postRouter = express.Router();

postRouter.post('/', validateToken, validateCategoriesId, createBlogPost);
postRouter.get('/', validateToken, getAllBlogPosts);
postRouter.get('/:id', validateToken, getBlogPostById);
postRouter.put('/:id', validateToken, userAuthorized, validateUpdateBlogPost, updateBlogPost);

module.exports = postRouter;