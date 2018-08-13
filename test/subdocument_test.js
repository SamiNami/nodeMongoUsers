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
        // ka
    });
});
