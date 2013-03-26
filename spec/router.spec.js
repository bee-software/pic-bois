var Server = require("../src/server");
var router = require("../src/router");
var request = require("request");

describe("Router", function () {

    var method;
    var url;
    var data;
    var server = new Server(router.route);

    beforeEach(function () {
        server.start();
    });

    afterEach(function () {
        server.stop();
    });

    it("routes all path to 404 by default", function (done) {
        request("http://localhost:5000/nowhere", function (error, response, body) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });

    it("routes configured post method", function (done) {
        router.addPost("/goal", mockCallback);
        request.post("http://localhost:5000/goal", {form: {key: "value"}}, function (error, response, body) {
            expect(response.statusCode).toEqual(200);
            expect(method).toEqual("POST");
            expect(url).toEqual("/goal");
            expect(data).toEqual("key=value");
            done();
        });
    });

    it("routes configured get method", function (done) {
        router.addGet("/hello", mockCallback);
        request.get("http://localhost:5000/hello", function (error, response, body) {
            expect(response.statusCode).toEqual(200);
            expect(method).toEqual("GET");
            expect(url).toEqual("/hello");
            done();
        });
    });

    function mockCallback(request, response) {
        method = request.method;
        url = request.url;

        request.on("data", function (chunk) {
            data = chunk.toString();
        });

        response.end();
    }

});