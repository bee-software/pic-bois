(function () {
    "use strict";

    var Server = require("./server");
    var Router = require("./router");
    var Goal = require("./new_goal_page");
    var HomePage = require("./home_page");
    var Player = require("./player_stat");

    function Web() {
        this.router = new Router();
        this.server = new Server(this.router.route.bind(this.router), process.env.PORT || 5000);
    }

    Web.prototype.start = function () {
        var goal = new Goal();
        var homePage = new HomePage();
        var player = new Player();

        this.router.addGet("/goals/new", goal.serveNewGoalPage);
        this.router.addPost("/goals/create", goal.createGoalFromRequest.bind(goal));
        this.router.addGet("/", homePage.serve);
        this.router.addGet("/players/<id>", player.show);

        this.server.start();
    };

    Web.prototype.stop = function () {
        this.server.stop();
    };

    module.exports = Web;
}());

if (require.main === module) {
    var Web = require("./web");
    var web = new Web();
    web.start();
}