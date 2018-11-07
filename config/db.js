var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zfd4kx', { useNewUrlParser: true });

module.exports = mongoose;