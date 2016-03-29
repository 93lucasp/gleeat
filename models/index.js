var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/gleeat");
module.exports.User = require("./user");
module.exports.Post = require("./post");