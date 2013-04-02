/*global describe, beforeEach, spyOn, it, expect */
var GoalRenderer = require("./goal_created_renderer");

describe("Goals creation renderer", function () {

    it("displays a goal created message with the goal information from the post", function (done) {
        var response = { setHeader : function() {}, write : function() {} };
        spyOn(response, "setHeader");
        spyOn(response, "write");

        var renderer = new GoalRenderer(response);

        renderer.render(1,2);

        expect(response.setHeader).toHaveBeenCalledWith("content-type", "text/html");
        expect(response.write).toHaveBeenCalledWith("<label id=\"message\">saved: goal scored by player 1 and assisted by player 2</label>");
        done();
    });

});