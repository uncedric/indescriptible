var express = require('express');
var app = express.Router();
// var auth = require('./../config/auth');
var config = require('./../config/config.json');

app.get('/',function (req,res) {
  res.json({
    version:'1.0.0',
    domain:config.domain
  });
});

app.use('/users/', require('./../api/user'));
app.use('/chat/', require('./../api/chat'));
app.use('/config/', require('./../api/config'));
app.use('/videos/', require('./../api/video'));


module.exports = app;
