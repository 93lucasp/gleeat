$(document).ready(function() {

  $(".editModalButton").click(function(){
    var id = $(this).data()._id;
    console.log(id);
    $("#savePost").attr("data-_id", id);
  });

  $(function () {
  $('[data-toggle="tooltip"]').tooltip();
});




});

var createUser = function(e) {
	e.preventDefault();
	var newUser = $(e.target).serialize();
	console.log(newUser);
	$.post("/api/users", newUser)
 	 .done(function(res) {
		var id = JSON.parse(res)._id;
		console.log('create user was successful!', res);
		// window.location.href = '/profile/' + id;
  $.post("/login", newUser)
    .done(function(req, res) {
     window.location.href = '/profile/' + id;
  });
	})
     .fail(function(err) {
     console.log("Error", err);
 });  
};

var renderUser = function(user) {
  var showUser = user;
  var $profilePage = $('#profile_page');
  $profilePage.html("");
  var userTemplate = Handlebars.compile($('#user-template').html());
  var compiledHTML = userTemplate({user: showUser});
    // console.log('USER', showUser);
  $profilePage.append(compiledHTML);
};

var loginUser = function(e) {
	// console.log("logged1");
	e.preventDefault();
	var user = $(e.target).serialize();
	console.log(user);
  	$.post("/login", user)
    .done(function(req, res) {
  	 window.location.href = '/home';
    })
    .fail(function(err) {
      console.log("Error", err);
    });  
};

var editUser = function(e) {

  var id = $('#userID').val();
  var updateData = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    email: $('#editEmail').val(),
    age: $('#editAge').val(),
    country: $('#editCountry').val(),
    skypeName: $('#editSkypeNAme').val(),
  };

  var ajaxOption = {
    url: '/profile/' + id,
    type: "PUT",
    data: updateData,
    success: function(result) {
      console.log("first name is:", updateData.firstName);
      $('#showFirstName').html(updateData.firstName);
      $('#showLastName').html(updateData.lastName);
      $('#showEmail').html(updateData.email);
      $('#showAge').html(updateData.age);
      $('#showSkypeName').html(updateData.skypeName);
      $('#showCountry').html(updateData.country);
      $('#headerName').html(updateData.firstName);
      
    }
  };
  $.ajax(ajaxOption);
};

var deleteUser = function(e) {
  var id = $(e.target).parent().attr("id");
  var ajaxOption = {
    url: '/profile/' + id,
    type: "DELETE",
    success: function(result) {
      $("#" + id).remove();
      window.location.href = '/';
    }
  };
  $.ajax(ajaxOption);
};

var createPost = function(e) {
  e.preventDefault();
  var newPost = $(e.target).serialize();
  console.log(newPost);
  $.post("/api/posts", newPost)
   .done(function(res) {
    console.log('create post was successful!', res);
    window.location.href = '/home';
  })
     .fail(function(err) {
     console.log("Error", err);
 });  
};



var editPost = function(post) {

  var id = $("#savePost").attr("data-_id");
  console.log(id);

  var updateData = {
    title: $('.titleEdit').val(),
  };

  var ajaxOption = {
    url: '/api/posts/' + id,
    type: "PUT",
    dataType: 'json',
    data: updateData,
    success: function(res) {
      console.log("UPDATED DATA", updateData, id);
      
      $('#'+id).html(updateData.title);
      id = "";
    
    }
  };
  $.ajax(ajaxOption);
};



var deletePost = function(post) {
  var postId = $(post).data()._id;
  console.log("ecooooo postID------", postId);
  console.log("ecooooo post1111", post);
  $.ajax({
    url: '/api/posts/' + postId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all foods
      window.location.href = '/home';
    }
  });
};
// var renderPosts = function(posts) {
//   var showPosts = posts;
//   var $homePage = $('#posts');
//   $homePage.html("");
//   var postsTemplate = Handlebars.compile($('#posts-template').html());
//   var compiledHTML = postsTemplate({posts: showPosts});
//     // console.log('USER', showUser);
//   $homePage.append(compiledHTML);
// };

