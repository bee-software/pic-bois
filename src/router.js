(function () {
    "use strict";

    var flaskRouter = require("flask-router")();

    function Router(){
    }

    Router.prototype.addPost = function(path, callback){
        flaskRouter.post(path, callback);
    };

    Router.prototype.addGet = function(path, callback){
        flaskRouter.get(path, callback);
    };

    Router.prototype.route = function (request, response) {
        flaskRouter.route(request, response);
    };

    module.exports = Router;
}());