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
        expect(recentCall).toEqualCall({'url': "/goals", 'type': "POST",
            'data': "scoredBy=23&assistedBy=11", 'dataType': "json"})
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
            return "Expected " + actual["type"] + " on " + actual["url"] + " with data " + actual["data"] + actual["dataType"] +
                "\n to be " + expected["type"] + " on " + expected["url"] + " with data " + expected["data" + expected["dataType"]];
        };

        return actual["url"] === expected["url"] &&
            actual["type"] === expected["type"] &&
            actual["data"] === expected["data"] &&
            actual["dataType"] === expected["dataType"];

    }

});
