const express = require('express');

const validateToken = require('../helpers/validateToken');
const { validateCategoriesId, createBlogPost, 
  getAllBlogPosts, getBlogPostById, validateUpdateBlogPost,
  userAuthorized, updateBlogPost,
  getPostById, deleteBlogPost, getPostBySearch } = require('../controllers/blogPostsController');

const postRouter = express.Router();

postRouter.get('/search', validateToken, getPostBySearch);
postRouter.post('/', validateToken, validateCategoriesId, createBlogPost);
postRouter.get('/', validateToken, getAllBlogPosts);
postRouter.get('/:id', validateToken, getBlogPostById);
postRouter.put('/:id', validateToken, userAuthorized, validateUpdateBlogPost, updateBlogPost);
postRouter.delete('/:id', validateToken, getPostById, userAuthorized, deleteBlogPost);

module.exports = postRouter;