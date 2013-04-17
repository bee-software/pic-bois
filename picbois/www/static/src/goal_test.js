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
        expect(recentCall).toEqualCall({'url': "/goals", 'type': "post", 'data': "scoredBy=23&assistedBy=11"})
    });

    it("displays the returned message", function () {
        setFixtures('<label id="message"></label>');

        spyOn($, "ajax").andCallFake(function (params) {
            params.success({'message': "ALLO"});
        });

        goal.mark();

        expect($('#message').html()).toEqual("ALLO")
    });

    function toEqualCall(expected) {
        var actual = this.actual;

        this.message = function () {
            return "Expected " + actual["type"] + " on " + actual["url"] + " with data " + actual["data"] +
                "\n to be " + expected["type"] + " on " + expected["url"] + " with data " + expected["data"];
        };

        return actual["url"] === expected["url"] &&
            actual["type"] === expected["type"] &&
            actual["data"] === expected["data"];

    }

});
