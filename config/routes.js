var express 			   = require('express'),
	app 				   = express(),
	mongoose 			   = require('mongoose'),
	bodyParser 			   = require('body-parser'),
	methodOverride 		   = require('method-override'),
	path 				   = require('path'),
	logger 				   = require('morgan'),
	// expressSession 		   = require('express-session'),
	// cookieParser   		   = require("cookie-parser"),
	postsController 	   = require('../controllers/posts'),
	usersController 	   = require('../controllers/users'),
	// sessionController	   = require('../controllers/session'),
	router 				   = express.Router();

mongoose.connect(process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 'mongodb://localhost/gleeat');

router.route('/').get(function(req, res){
  res.render('welcome');
});

router.route('/api')
	.get(usersController.apiRoot);
	
router.route('/api/users')
	.get(usersController.apiIndex)
	.post(usersController.create);

router.route('/profile/:id')
	.get(usersController.show);
	// .delete(usersController.destroy)
	// .put(usersController.update);


module.exports = router;