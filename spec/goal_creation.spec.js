/*global describe, beforeEach, it, spyOn, expect */
var GoalCreation = require("../src/goal_creation");

describe("GoalCreation", function () {

    var creation = new GoalCreation();

    it("tells to render the goal", function () {
        var renderer = { render : function(scoredBy, assistedBy) {} };
        spyOn(renderer, "render");
        creation.execute({ scoredBy : "12", assistedBy : "13"}, renderer.render);

        expect(renderer.render).toHaveBeenCalledWith("12", "13");
    });

});