var app = require('../express');
var q = require('q');

app.get("/api/test", findAllMessages);
app.post("/api/test", createMessage);
app.delete("/api/test/:id", deleteMessage);

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local

console.log(process.env.MONGODB_URI);
if(process.env.MONGODB_URI) { // check if running remotely
  connectionString = process.env.MONGODB_URI;
  console.log(connectionString);
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

var TestSchema = mongoose.Schema({
    message: String
});

var TestModel = mongoose.model("TestModel", TestSchema);

function findAllMessages(req, res) {
    TestModel
        .find()
        .then(
            function(tests) {
                res.json(tests);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function createMessage(req, res) {
    TestModel
        .create(req.body)
        .then(
            function(test) {
                res.json(test);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function deleteMessage(req, res) {
    TestModel
        .remove({_id: req.params.id})
        .then(
            function(result) {
                res.json(result);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}
