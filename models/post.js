var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user");

var PostSchema = new Schema({
	title: {type: String},
	createdAt: { type: Date, required: false, default: Date.now },
	postedBy: [{
       type: Schema.Types.ObjectId,
       ref: 'User'
    }]
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;