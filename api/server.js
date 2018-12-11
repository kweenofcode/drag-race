'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/kweens', require('./routes/kweens'));
app.use('/rules', require('./routes/rules'))
app.use('/users', require('./routes/users'))
app.use('/login', require('./routes/login'))
app.use('/game', require('./routes/game'))
app.use('/signup', require('./routes/signup'))

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

module.exports = app;
