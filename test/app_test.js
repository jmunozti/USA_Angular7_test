const restify = require('restify-clients'),
    assert = require('assert');

const client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:8080'
});

before(function(done) {
    console.log("Running unit tests");
    console.log("...................................................................................................................................................");
    require('../app');
    done();
});

describe('\nGET /api ->', function() {

    describe('Test: 200 response check -> ', function() {

        it('It: should get a 200 response', function(done) {

            client.get('/api', function(err, req, res, data) {

                if (err) {
                    throw new Error(err);
                } else {
                    if (res.statusCode != 200) {
                        throw new Error('invalid response from get');
                    }
                    done();
                }

            });

        });

    });

});

after(function() {
    require('../app').close();
});