var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/one-day-test';

var professionalSchema = new Schema({
  name: String,
  email: String,
  job: String
});

mongoose.model('Professional', professionalSchema);

mongoose.connect(dbURI);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Successfully connected to mongodb..');
});
