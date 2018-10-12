var express = require('express');
var app = express();

app.use(express.static('static'));

require('./routes/main')(app);

var server = app.listen(3000, function () {
});