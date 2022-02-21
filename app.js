const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRotes');
const categoriesRouter = require('./routes/categoriesRoutes');
const postRouter = require('./routes/postRoutes');

const { validateEmail,
  validateFields, validatePassword,
  login } = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

app.post('/login', validateEmail, validatePassword, validateFields, login);

module.exports = app;