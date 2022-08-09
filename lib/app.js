const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const users = require('./routes/users');
const items = require('./routes/items');
const notFound = require('./middleware/not-found');
const error = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/items', items);

app.use(notFound);
app.use(error);

module.exports = app;
