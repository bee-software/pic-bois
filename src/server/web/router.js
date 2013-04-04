(function () {
    "use strict";

    var FlaskRouter = require("flask-router");
    var PostHandler = require("./post_handler");

    function Router(){
        this.flaskRouter = new FlaskRouter();
    }

    Router.prototype.addPost = function(path, callback){
        var postHandler = new PostHandler(callback);
        this.flaskRouter.post(path, postHandler.handle.bind(postHandler));
    };

    Router.prototype.addGet = function(path, callback){
        this.flaskRouter.get(path, callback);
    };

    Router.prototype.route = function (request, response) {
        this.flaskRouter.route(request, response);
    };

    module.exports = Router;
}());