const { BlogPosts, Categories } = require('../models');

const findCategoriesByIds = async (categoriesIds) => {
  const categories = await Categories.findAll({ where: { id: categoriesIds } });
  if (categories.length === 0) {
    return { code: 400, message: '"categoryIds" not found' };
  }
  return false;
};

const createBlogPost = async (blogPostInfos) => {
  try {
    const { title, content, userId } = blogPostInfos;
    const blogPost = await BlogPosts.create({ title, content, userId });
    return blogPost;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createBlogPost,
  findCategoriesByIds,
};