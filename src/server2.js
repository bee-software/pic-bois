(function() {
    "use strict";

    var server;

    exports.start = function(router, callback) {
        server = require('http').createServer(router).listen(process.env.PORT || 5000, callback);
    };

    exports.stop = function(callback) {
        server.close(callback);
    };

}());