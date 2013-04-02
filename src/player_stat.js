(function () {
    "use strict";

    var fs = require("fs");

    function PlayerStat() {
    }

    PlayerStat.prototype.show = function (request, response) {

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

        var template = fs.readFileSync("./pages/player.html");
        var html = template.toString().replace(goalToken, numberOfGoals).replace(assistsToken, numberOfAssists);

        response.setHeader("content-type", "text/html");
        response.write(html);
        response.end();
    };

    function numberOfGoalOfPlayer(player){
        return fs.readFileSync("99.txt").toString();
    }

    module.exports = PlayerStat;
}());