var express = require('express'),
    app = module.exports = express(),
    userLogin = require('./userLogin'),
    books = require('./index');

//use the route files
app.use(userLogin);
app.use(books);
