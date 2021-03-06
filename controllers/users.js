var User    = require('../models/user');
var session = require('express-session');

var usersController = {
  create: function(req, res) {
  	var user = req.body;
  	User.createSecure(user, function(err, user) {
      console.log("user2 is: ", user);
      err ?
        res.status(500).send() :
        res.status(201).send(JSON.stringify(user));
    });
  },

	apiRoot: function(req, res) {
		res.json({
			message: "Welcome to FriendMe!",
			documentation_url: "https://github.com/93lucasp/gleeat",
      base_url: "http://gleeat.herokuapp.com",
      endpoints: [{method: "GET", path: "/api", description: "Describes available endpoints"}]
    });
  },

  apiIndex: function(req, res) {
  	User.find({}, function(err, users) {
  		res.status(200).send(JSON.stringify(users));
  	});
  },

  show: function(req, res) {
    console.log("finding user");
  	var id = req.params.id;
  	User.findById(id, function(err, user) {
  		if(err) returnError(err);
  	  res.render('../views/profile', {userJS: JSON.stringify(user), user: user});
  	});
  },
  update: function(req, res) {

    var id = req.params.id;
    User.findById(id, function(err, user){
      if (err) returnError(err);
      if (req.body.firstName) user.firstName = req.body.firstName;
      if (req.body.lastName) user.lastName = req.body.lastName;
      if (req.body.email) user.email = req.body.email;
      if (req.body.age) user.age = req.body.age;
      if (req.body.skypeName) user.skypeName = req.body.skypeName;
      if (req.body.country) user.country = req.body.country;
      if (req.body.passwordDigest) user.passwordDigest = req.body.passwordDigest;
      user.save(function(err, savedUser) {
        if (err) {
          res.status(200);
        } else {
          res.json(savedUser);
        }
      });
    });
  },

  destroy: function(req, res) {
    User.remove({_id: req.params.id}, function(err, user) {
      console.log(req.params.id);
      if(err) {
        res.status(500).send();
      } 
      else {
        res.status(204).send(JSON.stringify(user));
      }
    });
  },

  loginUser: function(req, res) {
    var user = req.body;
    console.log("logged4", user);
    var email = req.body.email;
    var password = req.body.password;
    console.log("user is3333: ", user);
    User.authenticate(email, password, function (err, user) {
      console.log("logged2");
      if (err) {
        console.log(err);
        res.status(500).send();
      } 
      else {
        req.login(user);
        res.status(200).send();
        console.log("login: ", req.session);
      }
    });
  },

  logoutUser: function(req, res) {
    req.logout();
    console.log("logout: ", req.session);
    res.redirect("/");
  },
};

module.exports = usersController;