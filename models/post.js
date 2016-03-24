var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	name: String,
	email: String,
	description: String,
	photoUrl: String,
	createdAt: { type: Date, required: false, default: Date.now },
	postedBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   }
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;