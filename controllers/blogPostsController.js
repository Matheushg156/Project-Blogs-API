const BlogPostsService = require('../services/blogPostsService');

const validateCategoriesId = async (req, res, next) => {
  const { categoriesIds } = req.body;
  if (!categoriesIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  const categories = await BlogPostsService.findCategoriesByIds(categoriesIds);
  if (categories) {
    return res.status(categories.code).json(categories.message);
  }
  next();
};

const createBlogPost = async (req, res) => {
  const { title, content, categoryId } = req.body;
  const { dataValues: { id } } = req.user;
  const blogPost = await BlogPostsService.createBlogPost({ title, content, id, categoryId });
  if (!blogPost.error) {
    return res.status(201).json(blogPost);
  } 
  res.status(400).json({ message: blogPost.errors[0].message });
};

module.exports = {
  createBlogPost,
  validateCategoriesId,
};