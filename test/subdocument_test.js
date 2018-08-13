const assert = require('assert');
const User = require('../src/User');

describe('Subdocuments', () => {
    it('can create a subdocument', done => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'PostTitle' }]
        });
        joe.save()
            .then(() => {
                return User.findOne({ name: 'Joe' });
            })
            .then(user => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('can add subdocuments to and existing record', done => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });
        joe.save()
            .then(() => {
                return User.findOne({ name: 'Joe' });
            })
            .then(user => {
                user.posts.push({ title: 'New post' });
                return user.save();
            })
            .then(() => {
                return User.findOne({ name: 'Joe' });
            })
            .then(user => {
                assert(user.posts[0].title === 'New post');
                done();
            });
    });

    it('can remove and exisitng subdocument', done => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'New Title' }]
        });
        joe.save()
            .then(() => {
                return User.findOne({ name: 'Joe' });
            })
            .then(user => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => {
                return User.findOne({ name: 'Joe' });
            })
            .then(user => {
                assert(user.posts.length === 0);
                done();
            });
    });
});
