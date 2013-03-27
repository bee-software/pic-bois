(function() {
    "use strict";


    function GoalCreation() {
    }

    GoalCreation.prototype.execute = function (post, render) {

        var scoredBy = post.scoredBy;
        var assistedBy = post.assistedBy;

        render(scoredBy, assistedBy);
    };

    module.exports = GoalCreation;
}());
