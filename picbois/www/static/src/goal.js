var goal = {};

(function () {
    "use strict";

    goal.addClickEventCallback = function() {
        $('#markGoal').on('click', goal.mark);
    };

    goal.mark = function () {
        $.ajax({
            type: "POST",
            url: "/goals",
            data: _withGoalInformation(),
            success: function(){ _displaySuccess(); },
            error: function(){ _displayErrorMessage(); },
            dataType: "json"
//            contentType: "application/json"
        });
    };

    function _withGoalInformation() {
        return $('#goal').serialize();
    }

    function _displaySuccess() {
        $('#message').html("Goal marked")
    }

    function _displayErrorMessage() {
        $('#message').html("Goal not marked")
    }

}());