const assert = require('assert');
const User = require('../src/User');
const Comment = require('../src/Comment');
const BlogPost = require('../src/BlogPost');

describe('Assosiations', () => {
    let joe, blogPost, comment;

    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({
            title: 'JS is Great',
            content: 'Yep it really is'
        });
        comment = new Comment({ content: 'Congratz on great post' });
        // references / assosiations
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        // set a reference in the comment to joe;
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
            done();
        });
    });
    it('it saves a relation between a user and a blogpost', done => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then(user => {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });
});
