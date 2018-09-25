var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/films');

module.exports = mongoose;