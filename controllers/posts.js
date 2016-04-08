var Post = require('../models/post');
var User = require('../models/user');

var postsController = {
	createPost: function(req, res) {
		
  	var post = req.body;
  	Post.create(post, function(err, post) {
      post.postedBy.push(req.session.userId);
 
      post.save(function(){
        console.log("post is111: ", post);
        err ?
          res.status(500).send() :
          res.status(201).send(JSON.stringify(post));
      })
      console.log("bodyyyyyy: ", req.body);
  });
  },

  apiPosts: function(req, res) {
    	Post.find({}, function(err, posts) {
    		res.status(200).send(JSON.stringify(posts));
    	});
    },

  show: function(req, res) {
    console.log("show route");

    Post.find({}, function(err, posts) {

      if(err) returnError(err);
      posts.forEach(function(post) {
          User.findOne({_id: post.postedBy[0]}, function(err, user) {

            post.user = user;
          });
      });
          console.log("currentUser is", req.currentUser);
          req.currentUser(function(){
            posts.forEach(function(post){
              console.log("posted by", post.postedBy[0]);
              console.log("req user", req.user);
              if(req.user && (post.postedBy[0].id === req.user._id.id)) {
              post.canDelete = true;
              } else {
              post.canDelete = false;
              }
    
            });
      
        res.render('../views/home', {posts: posts});
      });
      // if(currentUser && (currentUser._id === user._id)) {
      //   post.canDelete === true;
      // } else {
      //   post.canDelete === false;
      // }
    });
   
  },

  update: function(req, res) {

      var id = req.params.id;
      console.log("questo è l'id----", id);
      Post.findById(id, function(err, post){
        if (err) returnError(err);
        if (req.body.title) post.title = req.body.title;
        post.save(function(err, savedPost) {
          if (err) {
            res.status(200);
          } else {
            res.json(savedPost);
          }
      });
    });
  },

  destroy: function(req, res) {
    var id = req.params.id;
    console.log("back end post id---", id);
    Post.remove({_id: id}, function(err, post) {
      console.log(req.params.id);
      if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.sendStatus(200);
    });
  }
};


module.exports = postsController;