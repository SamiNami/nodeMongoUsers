const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
});

const BlogPost = mongoose.model('blogposts', BlogPostSchema);

module.exports = BlogPost;
