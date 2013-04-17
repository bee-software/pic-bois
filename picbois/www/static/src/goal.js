var goal = {};

(function () {
    "use strict";

    goal.addClickEventCallback = function() {
        $('#markGoal').on('click', goal.mark);
    };

    goal.mark = function () {
        $.post('/goals', _withGoalInformation(), function (result) {_displayMarkedGoalFrom(result);}, 'json');
    };

    function _withGoalInformation() {
        return $('#goal').serialize();
    }

    function _displayMarkedGoalFrom(result) {
        console.log(JSON.stringify(result));
        $('#message').html(result.message)
    }

}());