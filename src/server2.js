(function() {
    "use strict";

    var server;

    exports.start = function(router, callback) {
        server = require('http').createServer(router).listen(5000, 'localhost', callback);
    };

    exports.stop = function(callback) {
        server.close(callback);
    };

}());