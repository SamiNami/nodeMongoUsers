const assert = require('assert');
const User = require('../src/User');

describe('Updating records', () => {
    let joe;

    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => {
            done();
        });
    });

    function assertName(operation, done) {
        operation
            .then(() => {
                return User.find({});
            })
            .then(users => {
                assert(users.length === 1);
                assert(users[0].name === 'Kappa');
                done();
            });
    }

    it('instance type using set and save', done => {
        joe.set('name', 'Kappa');
        assertName(joe.save(), done);
    });

    it('a model instance can update', done => {
        assertName(joe.update({ name: 'Kappa' }), done);
    });

    it('a model class can update', done => {
        assertName(User.update({ name: 'Joe' }, { name: 'Kappa' }), done);
    });

    it('a model class can update one record', done => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe' }, { name: 'Kappa' }),
            done
        );
    });

    it('a model class can find a record by id and update', done => {
        assertName(User.findByIdAndUpdate(joe.id, { name: 'Kappa' }), done);
    });
});
