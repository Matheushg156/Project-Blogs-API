const { BlogPosts, Categories, PostsCategories } = require('../models');

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

module.exports = {
  createBlogPost,
  findCategoriesByIds,
};