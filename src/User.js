const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./Post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: name => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogposts' }]
});

UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});
// middleware
UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogposts');
    // this === joe
    // go throuh all BlogPosts, look at the id, if the iD is in IN the list, remove it
    BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
