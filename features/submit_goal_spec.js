/*global describe, beforeEach, afterEach, it, expect */
var Browser = require("zombie");
var Webapp = require("../src/web");

describe("submit goal", function () {

    var browser = new Browser();
    var webapp = new Webapp();

    beforeEach(function () {
        webapp.start();
    });

    afterEach(function () {
        webapp.stop();
    });

    it("offers a way to submit a goal", function (done) {
        browser.visit("http://localhost:5000/goals/new", function () {
            browser.fill("#scoredBy", "23");
            browser.fill("#assistedBy", "10");
            browser.pressButton("#submit", function () {
                expect(browser.text("#message")).toEqual("saved: goal scored by player 23 and assisted by player 10");
                done();
            });
        });
    });

    it("displays the players' numbers in the saved message", function (done) {
        browser.visit("http://localhost:5000/goals/new", function () {
            browser.fill("#scoredBy", "99");
            browser.fill("#assistedBy", "66");
            browser.pressButton("#submit", function () {
                expect(browser.text("#message")).toEqual("saved: goal scored by player 99 and assisted by player 66");
                done();
            });
        });
    });

});