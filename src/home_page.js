(function() {
    "use strict";

    var fs = require("fs");

    function HomePage() {
    }

    HomePage.prototype.serve = function (request, response) {
        response.setHeader("content-type", "text/html");
        response.write(fs.readFileSync("./pages/home.page.html"));
        response.end();
    };

    module.exports = HomePage;
}());