(function () {
    "use strict";

    var Server = require("./web/server");
    var Router = require("./web/router");
    var Goal = require("./new_goal_page");
    var HomePage = require("./home_page");
    var PlayerStatsPage = require("./player_stats_page");
    var GoalCreation = require("./goal_creation");
    var GoalCreatedRender = require("./goal_created_renderer");

    function Application() {
        this.router = new Router();
        this.server = new Server(this.router.route.bind(this.router), process.env.PORT || 5000);
    }

    Application.prototype.start = function () {
        var goal = new Goal();
        var homePage = new HomePage();
        var playerStatsPage = new PlayerStatsPage();

        this.router.addGet("/goals/new", goal.serve);
        this.router.addPost("/goals/create", handleGoalPost);
        this.router.addGet("/", homePage.serve);
        this.router.addGet("/players/<id>", playerStatsPage.serve);

        this.server.start();
    };

    Application.prototype.stop = function () {
        this.server.stop();
    };

    function handleGoalPost(post, response) {
        var renderer = new GoalCreatedRender(response);
        var goalCreation = new GoalCreation();
        goalCreation.execute(post, renderer.render.bind(renderer));
    }

    module.exports = Application;
}());

if (require.main === module) {
    var App = require("./application");
    var app = new App();
    app.start();
}