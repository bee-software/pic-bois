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

            var GoalCreation = require("./goal_creation");
            var goalCreation = new GoalCreation();

            goalCreation.execute(post, renderer(response));
            response.end();
        });
    };

    function renderer(response) {
        return function render(scoredBy, assistedBy){
            var messageToken = "this message is awesome";

            response.setHeader("content-type", "text/html");
            var template = fs.readFileSync("./pages/message.html");
            var html = template.toString()
                        .replace(messageToken,
                            "saved: goal scored by player " + scoredBy + " and assisted by player " + assistedBy);
            response.write(html);
        };
    }

    module.exports = Goal;
}());