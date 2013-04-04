/*global describe, beforeEach, afterEach, it, expect */
var Browser = require("zombie");
var App = require("../src/server/application");

describe("show player stat", function () {

    var browser = new Browser();
    var app = new App();

    beforeEach(function () {
        app.start();
    });

    afterEach(function () {
        app.stop();
    });

    it("displays a player's goals and assists", function (done) {
        browser.visit("http://localhost:5000/players/66").then(function () {
            expect(browser.text("#goals")).toEqual("85");
            expect(browser.text("#assists")).toEqual("114");
            done();
        });
    });

    it("displays another player's goals and assists", function (done) {
        browser.visit("http://localhost:5000/players/99").then(function () {
            expect(browser.text("#goals")).toEqual("52");
            expect(browser.text("#assists")).toEqual("163");
            done();
        });
    });

    it("displays an error when the player doesn't exists", function (done) {
        browser.visit("http://localhost:5000/players/1").then(function () {
            expect(browser.text("#goals")).toEqual("0");
            expect(browser.text("#assists")).toEqual("0");
            done();
        });
    });

});