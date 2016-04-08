var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || "mongodb://localhost/gleeat");
module.exports.User = require("./user");
module.exports.Post = require("./post");