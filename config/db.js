var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/actor');

module.exports = mongoose;