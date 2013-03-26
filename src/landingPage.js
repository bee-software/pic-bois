(function() {
    "use strict";

    var fs = require('fs');

    function LandingPage() {
    }

    LandingPage.prototype.serveLandingPage = function (request, response) {
        response.setHeader("content-type", "text/html");
        response.write(fs.readFileSync('./pages/landing.page.html'));
        response.end();
    };

    module.exports = LandingPage;
}());