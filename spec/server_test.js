(function () {
	"use strict";

	var server = require("../src/server2.js");
    var request = require("request");

	exports.setUp = function(done) {
		server.start(noRoutes, function() {
            console.log("Server started");
			done();
		});
	};

	exports.tearDown = function(done) {
		server.stop(function() {
            console.log("Server stopped");
			done();
		});
	};

    exports.test_isAliveOnPort5000 = function(test) {
        requesting("http://localhost:5000",
            returnsStatutCode200(test));
    };

    function noRoutes(request, response){
        response.end();
    }

    function requesting(url, callback){
        request(url, callback);
    }

    function returnsStatutCode200(test) {
        return function(error, response, body) {
            test.equals(response.statusCode, 200, "status code");
            test.done();
        };
    }

}());