var game = {};

(function () {
    "use strict";

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
        var markedGoals = $('#markedGoals');

        if (data.goals.length === 0) {
            markedGoals.append("<li>No goals</li>");
        }
        else {
            for (var i = 0; i < data.goals.length; i++) {
                var goal = data.goals[i];
                markedGoals.append("<li>" + goal.scoredBy + " " + goal.assistedBy + "</li>");
            }
        }
    }

    function _displayErrorMessage() {

    }

}());