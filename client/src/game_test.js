/*global describe, spyOn, it, expect, game */

describe("Game", function () {
    "use strict";

    it("retrieves marked goals", function () {
        spyOn($, "ajax");

        game.getGoals();

        var recentCall = $.ajax.mostRecentCall.args[0];
        expect(recentCall.url).toEqual("http://localhost:8000/games/1/goals/");
        expect(recentCall.type).toEqual("GET");

    });

    it("retrieves marked goals in json", function () {
        spyOn($, "ajax");

        game.getGoals();
        var recentCall = $.ajax.mostRecentCall.args[0];
        expect(recentCall.dataType).toEqual("json");
    });

    it("tells the page to display the marked goals", function () {
        var gamePage = { showGoals: function () {} };
        spyOn(gamePage, "showGoals");
        game.init(gamePage);

        spyOn($, "ajax").andCallFake(function (params) {
            params.success({goals: [
                {scoredBy: "11", assistedBy: "23"}
            ]});
        });

        game.getGoals();

        expect(gamePage.showGoals).toHaveBeenCalledWith([
            {scoredBy: "11", assistedBy: "23"}
        ]);
    });

});