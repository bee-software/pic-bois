/*global describe, beforeEach, afterEach, it, expect */
var Browser = require("zombie");
var Server = require("./server");
var HomePage = require("./home_page");
var Router = require("./router");


describe("Home page", function () {

    var browser = new Browser();

    var path = "/";
    var page = "http://localhost:5000";
    var router = new Router();
    var server = new Server(router.route, 5000);
    var homePage = new HomePage();
    router.addGet(path, homePage.serve);

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