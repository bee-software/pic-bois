/*global describe, it, spyOn, expect */

describe("Mark goal page", function () {

    it("posts the goals information on submit", function () {
        setFixtures('<form id="goal">' +
                    '<input id="scoredBy" name="scoredBy" value="23">' +
                    '<input id="assistedBy" name="assistedBy" value="11"/>' +
                    '</form>');

        spyOn($, "ajax");

        goal.mark();

        var recentCall = $.ajax.mostRecentCall.args[0];
        expect(recentCall["url"]).toEqual("/goals");
        expect(recentCall["type"]).toEqual("post");
        expect(recentCall["data"]).toEqual("scoredBy=23&assistedBy=11");
    });

    it("displays the returned message", function () {
        setFixtures('<label id="message"></label>');

        spyOn($, "ajax").andCallFake(function(params) {
            params.success({'message' : "ALLO"});
            });

        goal.mark();

        expect($('#message').html()).toEqual("ALLO")
    });
});
