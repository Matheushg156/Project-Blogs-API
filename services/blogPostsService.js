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

const updateBlogPost = async (blogPostInfos) => {
  const { id, title, content } = blogPostInfos;
  const blogPost = await BlogPosts.update(
    { title, content },
    { where: { id } },
  );
  if (blogPost) {
    const getBlogPost = await BlogPosts.findOne({
      where: { id },
      include: [
        { model: Categories, as: 'categories', attributes: ['id', 'name'] },
      ],
    });
    return getBlogPost;
  }
};

const deleteBlogPost = async (id) => {
  const blogPost = await BlogPosts.destroy({ where: { id } });
  if (blogPost) {
    return true;
  }
  return { code: 404, message: 'Post does not exist' };
};

module.exports = {
  createBlogPost,
  findCategoriesByIds,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};