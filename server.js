var express 	   	 = require('express'),
	app 		         = express(),
	mongoose 	       = require('mongoose'),
	bodyParser       = require('body-parser'),
	methodOverride 	 = require('method-override'),
	hbs 		   	     = require('hbs'),
	hbsutils 	 	     = require('hbs-utils')(hbs),
	path 			       = require('path'),
	db 				       = require("./models"),
	logger 			     = require('morgan'),
	bcrypt 			     = require('bcrypt'),
	session 		     = require("express-session"),
	keygen			     = require('keygenerator'),
	User 			       = require("./models/user");
  Post             = require("./models/post");


app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('__method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
hbsutils.registerWatchedPartials(__dirname + '/views/partials');

// create the session middleware
app.use(
  session({
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);

app.use(function(req, res, next){
  //login user
  req.login = function(user) {
    req.session.userId = user._id;
  };
  // find current user
  req.currentUser = function (cb) {
    User.findOne({ _id: req.session.userId },
    function(err, user){
      req.user = user;
      res.locals.currentUser = user;
      cb(null, user);
      });

  };

  // log out current user
  req.logout = function() {
    req.session.userId = null;
    req.user = null;
  };
  // call the next middleware in the stack
  req.currentUser(next);
});


var routes = require('./config/routes');
app.use(routes);

app.listen(2016, function() {
	console.log('server is running');
});

module.exports = app;