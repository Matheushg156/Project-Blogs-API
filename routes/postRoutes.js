const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../helpers/validateToken');
const { validateCategoriesId, createBlogPost, 
  getAllBlogPosts, getBlogPostById, validateUpdateBlogPost,
  userAuthorized, updateBlogPost,
  getPostById, deleteBlogPost, getPostBySearch } = require('../controllers/blogPostsController');

const postRouter = express.Router();

postRouter.get('/search', rescue(validateToken, getPostBySearch));
postRouter.post('/', rescue(validateToken, validateCategoriesId, createBlogPost));
postRouter.get('/', rescue(validateToken, getAllBlogPosts));
postRouter.get('/:id', rescue(validateToken, getBlogPostById));
postRouter.put('/:id', rescue(
  validateToken,
  userAuthorized,
  validateUpdateBlogPost,
  updateBlogPost,
  ));
postRouter.delete('/:id', rescue(validateToken, getPostById, userAuthorized, deleteBlogPost));

module.exports = postRouter;