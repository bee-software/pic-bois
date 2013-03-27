(function () {
    "use strict";

    var flaskRouter = require("flask-router")();

    exports.addPost = function(path, callback){
        flaskRouter.post(path, callback);
    };

    exports.addGet = function(path, callback){
        flaskRouter.get(path, callback);
    };

    exports.route = function (request, response) {
        flaskRouter.route(request, response);
    };

}());