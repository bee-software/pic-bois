(function () {
    "use strict";

    var flaskRouter = require('flask-router')();

    exports.addPost = function(path, callback){
        flaskRouter.post(path, callback);
    };

    exports.addGet = function(path, callback){
        flaskRouter.get(path, callback);
    };

    exports.route = function (request, response) {
        console.log("Route " + request.method + " " + request.url);
        flaskRouter.route(request, response);
    };

}());