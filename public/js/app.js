$(document).ready(function() {
  	parallax();
  });



function parallax() {
	var documentEl = $(document),
	    parallaxBg = $('div.parallax-bg');

	documentEl.on('scroll', function() {
		var currScrollPos = documentEl.scrollTop();
		parallaxBg.css('background-position', '0' + -currScrollPos/2 + 'px');
	});
}


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
    console.log('USER', showUser)
  $profilePage.append(compiledHTML);
};