const express = require('express');
const app = express();
const passport = require('passport');
const router = require('./routes');
const monggose = require('mongoose');
const  bodyParser = require('body-parser');

const DB_URL = 'mongodb://localhost/interlink-meetup';
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
monggose.connect(DB_URL, function (err) {
  if (err) {
    console.error('Mongo connection FAIL: ' + err)
  } else {
    console.log('Mongo connection OK')
  }
});


app.use(passport.initialize());
require('./config/passport')(passport);

app.use(express.json());
app.use(router);

module.exports = app;