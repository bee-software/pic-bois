(function () {
    "use strict";

    var fs = require("fs");

    function NewGoalPage() {
    }

    NewGoalPage.prototype.serve = function (request, response) {
        response.setHeader("content-type", "text/html");
        response.write(fs.readFileSync("./src/client/new_goal.html"));
        response.end();
    };

    module.exports = NewGoalPage;
}());