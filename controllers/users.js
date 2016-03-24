var User = require('../models/user');
// var session = require('express-session');

var usersController = {

	create: function(req, res) {
		var user = req.body;
		User.create(user, function(err, user) {
		  err ?
		    es.status(500).send() :
	  		res.status(201).send(JSON.stringify(user));
	  	});
	},

	apiRoot: function(req, res) {
		res.json({
			message: "Welcome to FriendMe!",
			documentation_url: "www.gleeat.com",
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
  	var id = req.params.id;
  	User.findById(id, function(err, user) {
  		if(err) returnError(err);
  		 res.render('../views/profile', {userJS: JSON.stringify(user), user: user});
  	});
  },
};

module.exports = usersController;