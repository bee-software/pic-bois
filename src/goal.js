(function() {
    "use strict";

    var fs = require('fs');
    var qs = require('querystring');

    function Goal() {
    }

    Goal.prototype.serveNewGoalPage = function (request, response) {
        response.setHeader("content-type", "text/html");
        response.write(fs.readFileSync('./pages/goals.new.html'));
        response.end();
    };

    Goal.prototype.createGoalFromRequest = function(request, response) {

        var body = '';

        request.on('data', function (chunk) {
            body += chunk;
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var scoredBy = post.scoredBy;
            var assistedBy = post.assistedBy;

            response.setHeader("content-type", "text/html");
            response.write("<label id=\"message\">saved: goal scored by player " +
                scoredBy +
                " and assisted by player " +
                assistedBy +
                "</label>");
            response.end();

        });
    };

    module.exports = Goal;
}());