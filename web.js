(function () {
    "use strict";

    var server = require('./src/server2');
    var router = require('./src/router');
    var Goal = require('./src/goal');

    exports.start = function () {
        var goal = new Goal();

        router.addGet("/goals/new", goal.serveNewGoalPage);
        router.addPost("/goals/create", goal.createGoalFromRequest);

        server.start(router.route, function () {
            console.log("app started");
        });
    };

    exports.stop = function (){
        server.stop(function () {
            console.log("app stopped");
        });
    };

}());

if (require.main === module) {
    var web = require('./web');
    web.start();
}

