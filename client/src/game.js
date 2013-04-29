var game = {};

(function () {
    "use strict";

    game.init = function (gamePage) {
        this.gamePage = gamePage;
    };

    game.goals = function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/games/1/goals/",
            success: _showGoals,
            error: _displayErrorMessage,
            dataType: "json"
        });
    };

    function _showGoals(data) {
        var goals = data.goals;

        if (goals.length === 0) {
            showNoGoals();
        }
        else {
            for (var i = 0; i < goals.length; i++) {
                var goal = goals[i];
                showGoal(goal);
            }
        }
    }

    function showNoGoals() {
        $('#markedGoals').append("<li>No goals</li>");
    }

    function showGoal(goal) {
        $('#markedGoals').append("<li>" + goal.scoredBy + " " + goal.assistedBy + "</li>");
    }

    function _displayErrorMessage(){
        $('#markedGoals').append("<li>Error</li>");
    }

}());