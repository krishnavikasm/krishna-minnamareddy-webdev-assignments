var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var assignment5 = require("./public/assignment/assignment5/app.js");
assignment5(app);


app.listen(app.get('port'));
