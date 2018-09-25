var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Film = db.model('Film', {
    title: String,
    year: Number,
    director: String,
    length: Number,
    category: String,
    description: String,
    comment: String,
    rating: Number,
    coverurl: String,
    seen: {
        type: Number,
        default: 0
    },
    _assignedto: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Film;