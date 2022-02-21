const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRotes');
const loginRouter = require('./routes/loginRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

module.exports = app;