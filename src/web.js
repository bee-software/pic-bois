(function () {
    "use strict";

    var Server = require("./server");
    var Router = require("./router");
    var Goal = require("./goal");
    var LandingPage = require("./landingPage");

    var router = {};
    var server = {};

    function Web(){
        router = new Router();
        server = new Server(router.route, process.env.PORT || 5000);
    }

    Web.prototype.start = function () {
        var goal = new Goal();
        var landingPage = new LandingPage();

        router.addGet("/goals/new", goal.serveNewGoalPage);
        router.addPost("/goals/create", goal.createGoalFromRequest);
        router.addGet("/", landingPage.serveLandingPage);

        server.start();
    };

    Web.prototype.stop = function (){
        server.stop();
    };

    module.exports = Web;
}());

if (require.main === module) {
    var Web = require("./web");
    var web = new Web();
    web.start();
}