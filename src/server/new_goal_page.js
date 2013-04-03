(function () {
    "use strict";

    var fs = require("fs");
    var qs = require("querystring");
    var GoalCreation = require("./goal_creation");
    var GoalCreatedRender = require("./goal_created_renderer");

    function NewGoalPage() {
        this.goalCreation = new GoalCreation();
    }

    NewGoalPage.prototype.serveNewGoalPage = function (request, response) {
        response.setHeader("content-type", "text/html");
        response.write(fs.readFileSync("./src/client/new_goal.html"));
        response.end();
    };

    NewGoalPage.prototype.createGoalFromRequest = function (request, response) {

        var body = "";

        request.on("data", function (chunk) {
            body += chunk;
        });

        request.on("end", function () {
            var post = qs.parse(body);
            var renderer = new GoalCreatedRender(response);
            this.goalCreation.execute(post, renderer.render.bind(renderer));
            response.end();
        }.bind(this));
    };

    module.exports = NewGoalPage;
}());