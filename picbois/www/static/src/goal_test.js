describe("Mark goal page", function () {

    it("posts the goals information on submit", function () {
        spyOn($, "ajax");
        goal.mark();
        var post = $.ajax.mostRecentCall.args[0];
        expect(post["url"]).toEqual("/goals");
        expect(post["url"]).toEqual("/goals");
    });

    it("displays the goal message on return", function () {

    });
});
