(function () {
    "use strict";

    var fs = require("fs");

    function GoalCreatedRenderer(resp) {
        this.response = resp;
    }

    GoalCreatedRenderer.prototype.render = function (scoredBy, assistedBy) {
        this.response.setHeader("content-type", "text/html");
        this.response.write(htmlMessage(scoredBy, assistedBy));
    };

    function htmlMessage(scoredBy, assistedBy) {
        var messageToken = "this message is awesome";
        var template = fs.readFileSync("./src/client/message.html");
        return template.toString().replace(messageToken,
            "saved: goal scored by player " + scoredBy + " and assisted by player " + assistedBy);
    }

    module.exports = GoalCreatedRenderer;
}());