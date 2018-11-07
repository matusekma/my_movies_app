var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Actor = db.model('Actor', {
    name: String,
    birthYear: Number,
    nationality: String,
    comment: String,
    description: String,
    picID: String,
    _films:  [{ type: Schema.Types.ObjectId, ref: 'Film' }]
});

module.exports = Actor;