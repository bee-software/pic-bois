var gamePage = {};
(function () {
    "use strict";


    gamePage.showGoals = function (goals) {
        if (goals.length === 0) {
            _showNoGoals();
        }
        else {
            for (var i = 0; i < goals.length; i++) {
                var goal = goals[i];
                _showGoal(goal);
            }
        }
    };

    function _showNoGoals() {
        $('#markedGoals').append("<li>No goals</li>");
    }

    function _showGoal(goal) {
        $('#markedGoals').append("<li>" + goal.scoredBy + " " + goal.assistedBy + "</li>");
    }

    gamePage.displayErrorMessage = function () {
        $('#markedGoals').append("<li>Error</li>");
    };
}());