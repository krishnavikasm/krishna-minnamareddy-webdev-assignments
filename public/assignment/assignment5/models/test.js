var mongoose = require('mongoose'), Schema = mongoose.Schema;

var connectionString = 'mongodb://127.0.0.1:27017/assignments';
mongoose.connect(connectionString, {
  useMongoClient: true,
});

var db = mongoose.connection;

var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });


Story.
  findOne({ title: 'Once upon a timex.' }).
  populate('_creator').
  exec(function (err, story) {
    console.log(err);
    if (err) return err;
    console.log('The creator is %s', story);
  });
