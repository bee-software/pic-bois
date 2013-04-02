/*global describe, beforeEach, afterEach, it, expect */
var Browser = require("zombie");
var WebApp = require("./web");

describe("New goal", function () {

    var page = "http://localhost:5000/goals/new";
    var webApp = new WebApp();
    var browser = new Browser();

    beforeEach(function () {
        webApp.start();
    });

    afterEach(function () {
        webApp.stop();
    });

    describe("page's title", function () {

        it("is 'Enter a new goal'", function (done) {
            browser.visit(page).then(function () {
                expect(browser.text("title")).toEqual("Enter a new goal");
                done();
            });
        });
    });

    describe("page's element", function () {

        it("field to enter goal is ready", function (done) {
            browser.visit(page).then(function () {
                expect(browser.query("input#scoredBy")).toBeDefined();
                done();
            });
        });

        it("field to enter assistant is ready", function (done) {
            browser.visit(page).then(function () {
                expect(browser.query("input#assistedBy")).toBeDefined();
                done();
            });
        });

        it("button to submit form is ready", function (done) {
            browser.visit(page).then(function () {
                expect(browser.query("button#submit")).toBeDefined();
                done();
            });
        });

        it("form to group the creation actors exists", function (done) {
            browser.visit(page).then(function () {
                expect(browser.query("form")).toBeDefined();
                done();
            });
        });

        it("form targets new goal creation", function (done) {
            browser.visit(page).then(function () {
                expect(browser.query("form").action).toEqual("/goals/create");
                done();
            });
        });

        it("forms is setup to post the values of goal creation", function (done) {
            browser.visit(page).then(function () {
                expect(browser.query("form").method).toEqual("post");
                done();
            });
        });

    });

});