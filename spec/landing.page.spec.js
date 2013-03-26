Browser = require("zombie");
Server = require("../src/server");
LandingPage = require("../src/landingPage");
var router = require("../src/router");


describe("Landing page", function () {

    var browser = new Browser();

    var path = "/";
    var page = "http://localhost:5000";
    var server = new Server(router.route);
    var landingPage = new LandingPage();
    router.addGet(path, landingPage.serveLandingPage);

    beforeEach(function () {
        server.start();
    });

    afterEach(function () {
        server.stop();
    });

    describe("page's title", function () {
        it("is 'DHHR - Dek Hockey Haut-Richelieu'", function (done) {
            browser.visit(page).then(function () {
                expect(browser.text("title")).toEqual("DHHR - Dek Hockey Haut-Richelieu");
                done();
            });
        });
    });

    describe("page's element", function () {
        it("contains a coming soon message", function (done) {
            browser.visit(page).then(function () {
                expect(browser.text("body")).toEqual("Coming Soon!");
                done();
            });
        });
    });
});