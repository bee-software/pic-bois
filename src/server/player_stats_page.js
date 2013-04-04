(function () {
    "use strict";

    var fs = require("fs");

    function PlayerStatsPage() {
    }

    PlayerStatsPage.prototype.serve = function (request, response) {

        var numberOfGoals;
        var numberOfAssists;
        if (request.params.id === "66") {
            numberOfGoals = 85;
            numberOfAssists = 114;
        }
        else if (request.params.id === "99") {
            numberOfGoals = 52;
            numberOfAssists = 163;
        }
        else {
            numberOfGoals = 0;
            numberOfAssists = 0;
        }

        var goalToken = "GOALS";
        var assistsToken = "ASSISTS";

        var template = fs.readFileSync("./src/client/player.html");
        var html = template.toString().replace(goalToken, numberOfGoals).replace(assistsToken, numberOfAssists);

        response.setHeader("content-type", "text/html");
        response.write(html);
        response.end();
    };

    module.exports = PlayerStatsPage;
}());