describe("Router", function () {

    var server = require('../src/server2.js');
    var router = require('../src/router.js');
    var request = require('request');
    var fs = require('fs');

    var method;
    var url;
    var data;

    beforeEach(function () {
        server.start(router.route, function () {
            console.log("Server started");
        });
    });

    afterEach(function () {
        server.stop(function () {
            console.log("Server stopped");
        });
    });

    it("routes all path to 404 by default", function (done) {
        request("http://localhost:5000/nowhere", function (error, response, body) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });

    it("routes configured post method", function (done) {
        router.addPost("/goal", mockCallback);
        request.post("http://localhost:5000/goal", {form: {key: 'value'}}, function (error, response, body) {
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

        request.on('data', function (chunk) {
            data = chunk.toString();
        });

        response.end();
    }

});