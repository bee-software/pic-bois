(function() {
    "use strict";

    var messageToken = "this message is awesome";

    function GoalCreation() {
    }

    GoalCreation.prototype.setRenderer = function (renderer) {
        this.template = renderer;
    };

    GoalCreation.prototype.execute = function (scoredBy, assistedBy, response) {
        var html = this.template.toString()
            .replace(messageToken,
                "saved: goal scored by player " + scoredBy + " and assisted by player " + assistedBy);

        response.write(html);
        response.end();
    };

    module.exports = GoalCreation;
}());
