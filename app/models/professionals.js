var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var professionalSchema = new Schema({
  name: String,
  email: String,
  job: String
});

mongoose.model('Professional', professionalSchema);

mongoose.connect('mongodb://localhost/one-day-test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully connected to mongodb..');
});
