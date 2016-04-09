var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt      = require('bcrypt');

var UserSchema  = new Schema({
	firstName: {type: String},
	lastName: {type: String},
	email: {type: String},
	skypeName: {type: String},
  country: {type: String},
	age: {type: Number},
	passwordDigest: {type: String, required: true},
});

// create a new user with secure (hashed) password (for sign up)
UserSchema.statics.createSecure = function (user, cb) {
  var _this = this; // `_this` now references our schema
  // generate some salt
  bcrypt.genSalt(function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.passwordDigest = hash; // ashing password
      _this.create(user, cb); // create a new user in the db with hashed password and execute the callback when done
    });
  });
};

// authenticate user (for login)
UserSchema.statics.authenticate = function (email, password, cb) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    // throw error if can't find user
    if (user === null) {
      cb("Can\'t find user with that email", null);
    } 
    // if found user, check if password is correct
    else if (user.checkPassword(password)) {
      // the user is found & password is correct, so execute callback
      // pass no error, just the user to the callback
      cb(null, user);
    } 
    else {
      cb("password incorrect", user); // user found, but password incorrect
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
  // `compareSync` is like `compare` but synchronous
  // returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};


var User       = mongoose.model('User', UserSchema);
module.exports = User;