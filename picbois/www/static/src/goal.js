var goal = {};

(function () {
    "use strict";

    goal.mark = function () {
        $.post('/goals', $('#goal').serialize(), function (result) {
            $('#message').html(result.message)
        }, 'json');
    };

    $('#markGoal').on('click', goal.mark);

}());