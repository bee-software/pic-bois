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

//    it("displays the goal message on return", function () {
//        spyOn($, "ajax").andCallFake(function(){
//            console.log("CALLED");
//            return "YEAH";
//        });
//        goal.mark();
//        var $message = $('#message');
//        console.log("MESSAGE" + JSON.stringify($message));
//        expect($message.text()).toEqual("ad")
//    });
});
