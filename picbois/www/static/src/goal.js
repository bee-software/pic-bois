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
            contentType: "application/json"
        });
    };

    function _withGoalInformation() {
        return JSON.stringify($('#goal').serializeObject());
    }

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    function _displaySuccess() {
        $('#message').html("Goal marked")
    }

    function _displayErrorMessage() {
        $('#message').html("Goal not marked")
    }

}());