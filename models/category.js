var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Category = db.model('Category', {
    name: String
});

module.exports = Category;