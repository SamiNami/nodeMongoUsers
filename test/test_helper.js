const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/users_test',
    { useNewUrlParser: true }
);

// make sure that the connection is set up before running tests
before(done => {
    mongoose.connection
        .once('open', () => console.log('Good to go!'))
        .on('error', error => {
            console.warn('Warning', error);
        });
    done();
});

beforeEach(done => {
    mongoose.connection.collections.users.drop(() => {
        // ready to execute the next test
        done();
    });
});
