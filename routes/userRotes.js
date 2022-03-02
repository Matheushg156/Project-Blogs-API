const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../helpers/validateToken');
const { createUser, getAllUsers, getUserById,
  deleteUser } = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.post('/', rescue(createUser));
usersRouter.get('/', rescue(validateToken, getAllUsers));
usersRouter.get('/:id', rescue(validateToken, getUserById));
usersRouter.delete('/me', rescue(validateToken, deleteUser));

module.exports = usersRouter;