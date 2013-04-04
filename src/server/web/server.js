(function() {
    "use strict";

    var http = require("http");

    function Server(serving, port) {
        this.serving = serving;
        this.port = port;
    }

    Server.prototype.start = function() {
        this.server = http.createServer(this.serving).listen(this.port);
    };

    Server.prototype.stop = function() {
        this.server.close();
    };

    module.exports = Server;
}());
