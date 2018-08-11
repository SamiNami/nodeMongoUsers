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
            done();
        });
    });

    it('finds a user with a particular id', done => {
        User.findById(joe.id).then(user => {
            assert(user.name === 'Joe');
            done();
        });
    });
});
