(function() {
    "use strict";

    var fs = require("fs");
    var qs = require("querystring");
    var GoalCreation = require("./goal_creation");
    var GoalCreatedRender = require("./goal_created_renderer");

    var goalCreation = new GoalCreation();

    function Goal() {
    }

    Goal.prototype.serveNewGoalPage = function (request, response) {
        response.setHeader("content-type", "text/html");
        response.write(fs.readFileSync("./pages/goals.new.html"));
        response.end();
    };

    Goal.prototype.createGoalFromRequest = function(request, response) {

        var body = "";

        request.on("data", function (chunk) {
            body += chunk;
        });

        request.on("end", function () {
            var post = qs.parse(body);
            var renderer = new GoalCreatedRender(response);
            goalCreation.execute(post, renderer.render);
            response.end();
        });
    };

    module.exports = Goal;
}());