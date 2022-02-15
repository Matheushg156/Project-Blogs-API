const BlogPostsService = require('../services/blogPostsService');

const findCategoriesByIds = async (req, res, next) => {
  const { categoriesIds } = req.body;
  const categories = await BlogPostsService.findCategoriesByIds(categoriesIds);
  if (categories) {
    res.status(categories.code).send(categories.message);
  }
  next();
};

const createBlogPost = async (req, res) => {
  const { title, content, categoryId } = req.body;
  const blogPost = await BlogPostsService.createBlogPost({ title, content, categoryId });
  if (!blogPost.error) {
    res.status(200).json(blogPost);
  } else {
    res.status(400).json({ message: blogPost.errors[0].message });
  }
};

module.exports = {
  createBlogPost,
  findCategoriesByIds,
};