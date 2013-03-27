(function () {
    "use strict";

    var Server = require("./server");
    var router = require("./router");
    var Goal = require("./goal");
    var LandingPage = require("./landingPage");

    var server = new Server(router.route);

    exports.start = function () {
        var goal = new Goal();
        var landingPage = new LandingPage();

        router.addGet("/goals/new", goal.serveNewGoalPage);
        router.addPost("/goals/create", goal.createGoalFromRequest);
        router.addGet("/", landingPage.serveLandingPage);

        server.start();
    };

    exports.stop = function (){
        server.stop();
    };

}());

if (require.main === module) {
    var web = require("./web");
    web.start();
}