var game = {};

(function () {
    "use strict";

    game.init = function (gamePage) {
        this.gamePage = gamePage;
    };

    game.getGoals = function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/games/1/goals/",
            success: game.success.bind(this),
            error: game.error.bind(this),
            dataType: "json"
        });
    };

    game.success = function (data) {
        var goals = data.goals;
        this.gamePage.showGoals(goals);
    };

    game.error = function () {
        this.gamePage.displayErrorMessage();
    };


}());