const BlogPostsService = require('../services/blogPostsService');

const validateCategoriesId = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  const categories = await BlogPostsService.findCategoriesByIds(categoryIds);
  if (categories) {
    return res.status(categories.code).json({ message: categories.message });
  }
  next();
};

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { dataValues: { id } } = req.user;
  const blogPost = await BlogPostsService.createBlogPost({ title, content, id, categoryIds });
  if (!blogPost.error) {
    return res.status(201).json(blogPost);
  } 
  res.status(400).json({ message: blogPost.errors[0].message });
};

const getAllBlogPosts = async (req, res) => {
  const blogPosts = await BlogPostsService.getAllBlogPosts();
  if (blogPosts) {
    return res.status(200).json(blogPosts);
  }
  res.status(500).json({ message: blogPosts.errors[0].message });
};

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const blogPost = await BlogPostsService.getBlogPostById(id);
  if (blogPost) {
    return res.status(200).json(blogPost);
  }
  if (!blogPost) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  res.status(500).json({ message: blogPost.errors[0].message });
};

const validateUpdateBlogPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
};

module.exports = {
  createBlogPost,
  validateCategoriesId,
  getAllBlogPosts,
  getBlogPostById,
  validateUpdateBlogPost,
};