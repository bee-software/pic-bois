/*global describe, beforeEach, afterEach, it, expect */
var Browser = require("zombie");
var Server = require("../src/server");
var LandingPage = require("../src/landingPage");
var Router = require("../src/router");


describe("Landing page", function () {

    var browser = new Browser();

    var path = "/";
    var page = "http://localhost:5000";
    var router = new Router();
    var server = new Server(router.route, 5000);
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