/*global describe, beforeEach, afterEach, it, expect */
var Browser = require("zombie");
var WebApp = require("./web");

describe("Home page", function () {

    var browser = new Browser();

    var page = "http://localhost:5000";
    var webApp = new WebApp();

    beforeEach(function () {
        webApp.start();
    });

    afterEach(function () {
        webApp.stop();
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