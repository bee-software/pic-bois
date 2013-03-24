(function () {
    "use strict";

    var server = require('./src/server2.js');
    var router = require('./src/router.js');
    var fs = require('fs');
    var qs = require('querystring');

    exports.start = function () {
        router.addGet("/goals/new", newGoal);
        router.addPost("/goals/create", createGoal);
        server.start(router.route, function () {
            console.log("app started");
        });
    };

    exports.stop = function (){
        server.stop(function () {
            console.log("app stopped");
        });
    };

    function newGoal(request, response) {
        response.setHeader("content-type", "text/html");
        response.write(fs.readFileSync('./pages/goals.new.html'));
        response.end();
    }

    function createGoal(request, response) {

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
    }

}());

if (require.main === module) {
    var web = require('./web');
    web.start();
}

