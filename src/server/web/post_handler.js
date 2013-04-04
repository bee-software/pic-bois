(function () {
    "use strict";

    var qs = require("querystring");

    function PostHandler(action) {
        this.action = action;
    }

    PostHandler.prototype.handle = function (request, response) {

        var body = "";

        request.on("data", function (chunk) {
            body += chunk;
        });

        request.on("end", function () {
            var post = qs.parse(body);
            this.action(post, response);
            response.end();
        }.bind(this));
    };

    module.exports = PostHandler;
}());