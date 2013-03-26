var Server = require("../src/server");
var request = require("request");

describe("Server", function () {

    var server = new Server(function dummyRouter(request, response) {
        response.end();
    });

    beforeEach(function () {
        server.start();
    });

    afterEach(function () {
        server.stop();
    });

    it("can be instantiated", function (done) {
        expect(server).toNotBe(null);
        done();
    });

    it("is alive on port 5000", function (done) {
        requesting("http://localhost:5000",
            returnsStatutCode200(done));
    });

    function requesting(url, assertionCallback) {
        request(url, assertionCallback);
    }

    function returnsStatutCode200(done) {
        return function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        };
    }

});