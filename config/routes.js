var express 			   = require('express'),
	app 				   = express(),
	mongoose 			   = require('mongoose'),
	bodyParser 			   = require('body-parser'),
	methodOverride 		   = require('method-override'),
	path 				   = require('path'),
	logger 				   = require('morgan'),
	expressSession 		   = require('express-session'),
	cookieParser   		   = require("cookie-parser"),
	postsController 	   = require('../controllers/posts'),
	usersController 	   = require('../controllers/users'),
	router 				   = express.Router();

router.route('/').get(function(req, res){
  res.render('welcome');
});

router.route('/api')
	.get(usersController.apiRoot);
	
router.route('/api/users')
	.get(usersController.apiIndex)
	.post(usersController.create)

router.route('/api/posts')
	.get(postsController.apiPosts)
	.post(postsController.createPost);

router.route('/api/posts/:id')
    .put(postsController.update)
	.delete(postsController.destroy);

router.route('/profile/:id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.destroy);

router.route('/home')
	.get(postsController.show);

router.route('/profile/:id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.destroy);
	

	//session routes
router.route('/login')
 	.post(usersController.loginUser);
router.route('/logout')
 	.get(usersController.logoutUser);


module.exports = router;