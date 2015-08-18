var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var professionalSchema = new Schema(
  {
  name: String,
  job: String,
  local            : {
      email        : String,
      password     : String,
  }}
);

professionalSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

professionalSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Professional', professionalSchema);
