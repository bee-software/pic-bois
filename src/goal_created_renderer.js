(function () {
    "use strict";

    var fs = require("fs");

    function GoalCreationRenderer() {
    }

    GoalCreationRenderer.prototype.render = function(response) {
        return function render(scoredBy, assistedBy){
            var messageToken = "this message is awesome";

            var template = fs.readFileSync("./pages/message.html");
            var html = template.toString()
                        .replace(messageToken,
                            "saved: goal scored by player " + scoredBy + " and assisted by player " + assistedBy);
            response.write(html);
        };
    };

    module.exports = GoalCreationRenderer;
}());