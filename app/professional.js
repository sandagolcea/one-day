var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var professionalSchema = new Schema(
  {
  name: String,
  job: String,
  local: {
    email: String,
    password: String,
  }}
);

professionalSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

professionalSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

Professional = mongoose.model('Professional', professionalSchema);

//TODO: check with server for code duplication
//TODO: change register function to accept profile (profile.email, profile.name etc)
Professional.register = function (email, password, callback) {
  var professional = new Professional({
    name: email,
    job: 'none',
    local : {
      email: email,
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8), null)
    }
  });
  professional.save( function (err, prof) {
    if (err) {
      throw (err);
    } else {
      callback(prof);
    }
  });
};

Professional.findByEmail = function (email, success, fail) {
  Professional.findOne({ 'local.email': email }, function(err, foundProfessional){
    if(err) {
      fail(err);
    } else {
      success(foundProfessional);
    }
  });
};

module.exports = Professional;
