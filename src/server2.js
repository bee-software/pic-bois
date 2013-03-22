(function() {
    "use strict";

    var server;

    exports.start = function(servingRoutes, callback) {
        server = require('http').createServer(servingRoutes).listen(5000, 'localhost', callback);
    };

    exports.stop = function(callback) {
        server.close(callback);
    };

}());