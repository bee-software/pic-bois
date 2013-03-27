/*global describe, beforeEach, spyOn, it, expect */
describe("Goals creation renderer", function () {

    it("displays a goal created message with the goal information from the post", function (done) {
        var GoalRenderer = require("../src/goal_created_renderer");
        var response = { write : function() {} };
        var renderer = new GoalRenderer();

        spyOn(response, "write");

        var renderFunction = renderer.render(response);
        renderFunction(1,2);

        expect(response.write).toHaveBeenCalledWith("<label id=\"message\">saved: goal scored by player 1 and assisted by player 2</label>");
        done();
    });

});