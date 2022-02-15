const { BlogPosts, Categories, PostsCategories } = require('../models');

const findCategoriesByIds = async (categoriesIds) => {
  const categories = await Categories.findAll({ where: { id: categoriesIds } });
  if (categories.length !== categoriesIds.length) {
    return { code: 400, message: '"categoryIds" not found' };
  }
  return false;
};

const categoriesToPost = (categoriesIds, blogPostId) => {
  const categories = categoriesIds.map((categoryId) => ({
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
    const { title, content, id, categoriesIds } = blogPostInfos;
    const blogPost = await BlogPosts.create({ title, content, userId: id });
    const categories = categoriesToPost(categoriesIds, blogPost.id);
    await PostsCategories.bulkCreate(categories);
    return {
      id: categories.id,
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