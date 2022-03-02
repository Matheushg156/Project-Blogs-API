const express = require('express');

const validateToken = require('../helpers/validateToken');
const { createUser, getAllUsers, getUserById,
  deleteUser } = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', validateToken, getAllUsers);
usersRouter.get('/:id', validateToken, getUserById);
usersRouter.delete('/me', validateToken, deleteUser);

module.exports = usersRouter;