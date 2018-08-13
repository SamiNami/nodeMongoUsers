const assert = require('assert');
const User = require('../src/User');

describe('Virtual tests', () => {
    it('postCount returns a number of posts', done => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'PostTitle' }]
        });

        joe.save()
            .then(() => {
                return User.findOne({ name: 'Joe' });
            })
            .then(user => {
                assert(user.postCount === 1);
                done();
            });
    });
});
