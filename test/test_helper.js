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
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});
