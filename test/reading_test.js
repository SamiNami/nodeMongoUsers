const assert = require('assert');
const User = require('../src/User');

describe('Reading user out of the database', () => {
    let joe, maria, alex, zach;

    beforeEach(done => {
        alex = new User({ name: 'Alex' });
        maria = new User({ name: 'Maria' });
        zach = new User({ name: 'Zach' });
        joe = new User({ name: 'Joe' });
        Promise.all([alex.save(), maria.save(), zach.save(), joe.save()]).then(
            () => {
                done();
            }
        );
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

    it('can skip and limit the result set', done => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then(users => {
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });
});
