(function () {
    "use strict";

    var Server = require("./server");
    var Router = require("./router");
    var Goal = require("./new_goal_page");
    var HomePage = require("./home_page");
    var Player = require("./player_stat");

    var router = {};
    var server = {};

    function Web(){
        router = new Router();
        server = new Server(router.route, process.env.PORT || 5000);
    }

    Web.prototype.start = function () {
        var goal = new Goal();
        var homePage = new HomePage();
        var player = new Player();

        router.addGet("/goals/new", goal.serveNewGoalPage);
        router.addPost("/goals/create", goal.createGoalFromRequest);
        router.addGet("/", homePage.serve);
        router.addGet("/players/<id>", player.show);

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