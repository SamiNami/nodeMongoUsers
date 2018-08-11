const assert = require('assert');
const User = require('../src/User');

describe('Reading user out of the database', () => {
    let joe;

    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => {
            done();
        });
    });

    it('finds all users with a name of Joe', done => {
        User.find({ name: 'Joe' }).then(users => {
            assert(users[0].id === joe.id);
        });
        done();
    });
});
