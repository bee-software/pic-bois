(function () {
    "use strict";

    var fs = require("fs");
    var response;

    function GoalCreatedRenderer(resp) {
        response = resp;
    }

    GoalCreatedRenderer.prototype.render = function (scoredBy, assistedBy) {
        var messageToken = "this message is awesome";

        response.setHeader("content-type", "text/html");
        var template = fs.readFileSync("./pages/message.html");
        var html = template.toString()
            .replace(messageToken,
                "saved: goal scored by player " + scoredBy + " and assisted by player " + assistedBy);
        response.write(html);
    };

    module.exports = GoalCreatedRenderer;
}());