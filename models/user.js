var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	email: {type: String},
	skypeName: {type: String},
	photoUrl: String,
	passwordDigest: {type: String, required: true},
  
});

var User = mongoose.model('User', UserSchema);
module.exports = User;