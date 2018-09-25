var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Actor = db.model('Film', {
    name: String,
    birthyear: Number,
    nationality: String,
    comment: String,
    description: String,
    picurl: String
});

module.exports = Actor;