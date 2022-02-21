const { BlogPosts, Categories, PostsCategories, User } = require('../models');

const findCategoriesByIds = async (categoryIds) => {
  const categories = await Categories.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return { code: 400, message: '"categoryIds" not found' };
  }
  return false;
};

const categoriesToPost = (categoryIds, blogPostId) => {
  const categories = categoryIds.map((categoryId) => ({
    postId: blogPostId,
    categoryId,
  }));
  return categories;
};

/* 
Adicionar varios posts ao mesmo tempo:
Source: https://sebhastian.com/sequelize-bulk-create/#:~:text=When%20you%20need%20to%20insert,with%20a%20single%20function%20call.
*/

const createBlogPost = async (blogPostInfos) => {
  try {
    const { title, content, id, categoryIds } = blogPostInfos;
    const blogPost = await BlogPosts.create({ title, content, userId: id });
    const categories = categoriesToPost(categoryIds, blogPost.id);
    await PostsCategories.bulkCreate(categories);
    return {
      id: blogPost.id,
      userId: id,
      title,
      content,
    };
  } catch (error) {
    return error;
  }
};

const getAllBlogPosts = async () => {
  try {
    const blogPosts = await BlogPosts.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', attributes: ['id', 'name'] },
      ],
    });
    return blogPosts;
  } catch (error) {
    return error;
  }
};

const getBlogPostById = async (id) => {
  try {
    const blogPost = await BlogPosts.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', attributes: ['id', 'name'] },
      ],
    });
    return blogPost;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createBlogPost,
  findCategoriesByIds,
  getAllBlogPosts,
  getBlogPostById,
};