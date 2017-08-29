var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());

var databaseUrl = 'mongodb://localhost:27017/betelgeuse';
mongoose.connect(databaseUrl, {
    useMongoClient: true
});

mongoose.connection.on('connected', function() {
    console.log('mongoose connected to : ', databaseUrl);
});
mongoose.connection.on('error', function(err) {
    console.log('mongoose connection error to : ', err);
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});