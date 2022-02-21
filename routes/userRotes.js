const express = require('express');

const validateToken = require('../helpers/validateToken');
const { createUser, getAllUsers, getUserById } = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', validateToken, getAllUsers);
usersRouter.get('/:id', validateToken, getUserById);

module.exports = usersRouter;