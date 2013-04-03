(function () {
    "use strict";

    var FlaskRouter = require("flask-router");

    function Router(){
        this.flaskRouter = new FlaskRouter();
    }

    Router.prototype.addPost = function(path, callback){
        this.flaskRouter.post(path, callback);
    };

    Router.prototype.addGet = function(path, callback){
        this.flaskRouter.get(path, callback);
    };

    Router.prototype.route = function (request, response) {
        this.flaskRouter.route(request, response);
    };

    module.exports = Router;
}());