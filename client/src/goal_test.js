/*global describe, beforeEach, jasmine, loadFixtures, it, spyOn, expect, goal */

describe("Mark goal page", function () {
    "use strict";

    beforeEach(function () {
        this.addMatchers({
            toEqualCall: jasmine.toEqualCall
        });
        jasmine.getFixtures().fixturesPath = '/base/client';
    });

    it("posts the goals information on submit", function () {
        loadFixtures('new_goal.html');
        $('#scoredBy').val('23');
        $('#assistedBy').val('11');

        spyOn($, "ajax");

        goal.mark();

        var recentCall = $.ajax.mostRecentCall.args[0];
        expect(recentCall).toEqualCall({url: "http://localhost:8000/goals", type: "POST", data: {assistedBy: "11", scoredBy: "23"},
                                           contentType: "application/json" });
    });

    it("displays success on 201", function () {
        loadFixtures('new_goal.html');

        spyOn($, "ajax").andCallFake(function (params) {
            params.success();
        });

        goal.mark();

        expect($('#message').html()).toEqual("Goal marked");
    });

    it("displays error on 400", function () {
        loadFixtures('new_goal.html');

        spyOn($, "ajax").andCallFake(function (params) {
            params.error();
        });

        goal.mark();

        expect($('#message').html()).toEqual("Goal not marked");
    });


    jasmine.toEqualCall = function(expected) {
        var actual = this.actual;

        this.message = function () {
            return "Expected " + actual.type + " on " + actual.url + " with data " + actual.data +
                " with a content type of " + actual.contentType +
                "\n   to be " + expected.type + " on " + expected.url + " with data " + JSON.stringify(expected.data) +
                " with content type of " + expected.contentType;
        };

        return actual.url === expected.url &&
            actual.type === expected.type &&
            javascriptObjectsEqual(JSON.parse(actual.data), expected.data) &&
            actual.contentType === expected.contentType;

    };

    function javascriptObjectsEqual(a, b) {

        function sort(object) {
            if (Array.isArray(object)) {
                return object.sort();
            }
            else if (typeof object !== "object" || object === null) {
                return object;
            }

            return Object.keys(object).sort().map(function(key) {
                return {
                    key: key,
                    value: sort(object[key])
                };
            });
        }

        return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
    }

});
