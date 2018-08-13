const assert = require('assert');
const User = require('../src/User');

describe('Validate records', () => {
    it('requires a user name', done => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required');
        done();
    });

    it('username is atleast two characters long', done => {
        const user = new User({ name: 'al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters');
        done();
    });
});
