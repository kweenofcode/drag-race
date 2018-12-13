'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path')
const config = require('config');
const mongoose = require('mongoose')
const API_PORT = process.env.PORT || config.PORT;
const MONGOOSE_URI = process.env.MONGODB_URI || config.MONGODB_URI;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/kweens', require('./routes/kweens'));
app.use('/rules', require('./routes/rules'))
app.use('/users', require('./routes/users'))
app.use('/login', require('./routes/login'))
app.use('/game', require('./routes/game'))
app.use('/signup', require('./routes/signup'))
app.use('/', express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

app.listen(API_PORT, () => {
  console.log(`Listening on Port ${API_PORT}`)
})
mongoose.connect(MONGOOSE_URI)

module.exports = app;
