(function() {
    "use strict";

    var fs = require("fs");
    var qs = require("querystring");

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
            var scoredBy = post.scoredBy;
            var assistedBy = post.assistedBy;

            var GoalCreation = require("./goal_creation");
            var goalCreation = new GoalCreation(/* renderer*/);

            goalCreation.setRenderer(fs.readFileSync("./pages/message.html"));
            goalCreation.execute(scoredBy, assistedBy, response);

        });
    };

    module.exports = Goal;
}());