/*global describe, beforeEach, afterEach, it, expect */
var Browser = require("zombie");
var Webapp = require("../src/web");

describe("show player stat", function () {

    var browser = new Browser();
    var webapp = new Webapp();

    beforeEach(function () {
        webapp.start();
    });

    afterEach(function () {
        webapp.stop();
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

//    it("of a player who just scored a goal", function (done) {
//        browser.visit("http://localhost:5000/goals/new")
//            .then(function() {
//                browser.fill("#scoredBy", "99");
//                browser.fill("#assistedBy", "66");
//                browser.pressButton("#submit");
//            })
//            .then(function(){
//                browser.visit("http://localhost:5000/players/99")
//                    .then(function () {
//                        expect(browser.text("#goals")).toEqual("1");
//                        expect(browser.text("#assists")).toEqual("0");
//                        done();
//                    });
//            });
//    });
});