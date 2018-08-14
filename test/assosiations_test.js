const assert = require('assert');
const User = require('../src/User');
const Comment = require('../src/Comment');
const BlogPost = require('../src/BlogPost');

describe('Assosiations', () => {
    let joe, blogPost, comment;
    beforeEach(done => {
        joe = new User({ name: 'joe' });
        blogPost = new BlogPost({
            title: 'Js is Great',
            content: 'Yep it really is'
        });
        comment = new Comment({ content: 'Congratz on great post' });

        joe.blogPosts.push(blogPosts);
        blogPost.comments.push(comment);
        // set a reference in the comment to joe;
        comment.user = joe;
    });
    it('can create a subdocument', done => {});
});
