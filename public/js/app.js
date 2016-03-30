$(document).ready(function() {

  // $("#logout").click(function(user) {
  // debugger;
  // console.log(req.session);
  // console.log(req.session);
  // session.destroy();
// });

});
var createUser = function(e) {
	e.preventDefault();
	var newUser = $(e.target).serialize();
	console.log(newUser);
	$.post("/api/users", newUser)
 	 .done(function(res) {
		var id = JSON.parse(res)._id;
		console.log('create user was successful!', res);
		window.location.href = '/profile/' + id;
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
    console.log('USER', showUser);
  $profilePage.append(compiledHTML);
};

var loginUser = function(e) {
	console.log("logged1");
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

// $("#logout").click(function() {
//   console.log("destroiiiiiiiiiiiiiing");
// 	req.session.destroy();
// });

