var express 	   	= require('express'),
	app 		    = express(),
	mongoose 	    = require('mongoose'),
	bodyParser     	= require('body-parser'),
	methodOverride 	= require('method-override'),
	hbs 		   	= require('hbs'),
	hbsutils 	 	= require('hbs-utils')(hbs),
	path 			= require('path'),
	logger 			= require('morgan'),
	// bcrypt 			= require('bcrypt'),
	// session 		= require("express-session"),
	// keygen			= require('keygenerator'),
	User 			= require("./models/user");

app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('__method'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
hbsutils.registerWatchedPartials(__dirname + '/views/partials');


var routes = require('./config/routes');
app.use(routes);

app.listen(process.env.PORT || 2000, function() {
	console.log('server is running');
});

module.exports = app;