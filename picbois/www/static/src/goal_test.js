/*global describe, it, spyOn, expect */

describe("Mark goal page", function () {

    beforeEach(function () {
        this.addMatchers({
            toEqualCall: toEqualCall
        });
    });

    it("posts the goals information on submit", function () {
        setFixtures('<form id="goal">' +
            '<input id="scoredBy" name="scoredBy" value="23">' +
            '<input id="assistedBy" name="assistedBy" value="11"/>' +
            '</form>');

        spyOn($, "ajax");

        goal.mark();

        var recentCall = $.ajax.mostRecentCall.args[0];
        expect(recentCall).toEqualCall({url: "/goals", type: "POST", data: {assistedBy: "11", scoredBy: "23"},
                                           contentType: "application/json" })
    });

    it("displays success on 201", function () {
        setFixtures('<label id="message"></label>');

        spyOn($, "ajax").andCallFake(function (params) {
            params.success();
        });

        goal.mark();

        expect($('#message').html()).toEqual("Goal marked")
    });

    it("displays error on 400", function () {
        setFixtures('<label id="message"></label>');

        spyOn($, "ajax").andCallFake(function (params) {
            params.error();
        });

        goal.mark();

        expect($('#message').html()).toEqual("Goal not marked")
    });


    function toEqualCall(expected) {
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

    }

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
