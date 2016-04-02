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
    console.log('USER', showUser);
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

