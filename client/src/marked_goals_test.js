/*global describe, beforeEach, loadFixtures, spyOn, it, expect, game, gamePage */

describe("Marked goals", function () {
    "use strict";

    beforeEach(function () {
        game.init(gamePage);
    });

    it("contains a placeholder for marked goals", function () {
        loadFixtures('new_goal.html');
        expect($('#markedGoals').is('ul')).toBeTruthy();
    });

    it("gets a game marked goals", function () {
        loadFixtures('new_goal.html');
        spyOn($, "ajax");

        game.getGoals();

        var recentCall = $.ajax.mostRecentCall.args[0];
        expect(recentCall.url).toEqual("http://localhost:8000/games/1/goals/");
        expect(recentCall.type).toEqual("GET");

    });

    it("gets the goals in json", function () {
        loadFixtures('new_goal.html');
        spyOn($, "ajax");

        game.getGoals();
        var recentCall = $.ajax.mostRecentCall.args[0];
        expect(recentCall.dataType).toEqual("json");
    });

    it("shows a marked goal", function () {
        loadFixtures('new_goal.html');

        spyOn($, "ajax").andCallFake(function (params) {
            params.success({goals: [
                {scoredBy: "11", assistedBy: "23"}
            ]});
        });

        game.getGoals();

        expect($('#markedGoals').find('li').html()).toEqual("11 23");
    });

    it("shows no goals if theres no marked goals", function () {
        loadFixtures('new_goal.html');

        spyOn($, "ajax").andCallFake(function (params) {
            params.success({goals: []});
        });

        game.getGoals();

        expect($('#markedGoals').find('li').html()).toEqual("No goals");
    });

    it("shows all received marked goal", function () {
        loadFixtures('new_goal.html');

        var goals = [
            {scoredBy: "11", assistedBy: "22"},
            {scoredBy: "1", assistedBy: "00"},
            {scoredBy: "5", assistedBy: ""}
        ];

        spyOn($, "ajax").andCallFake(function (params) {
            params.success({goals: [
                {scoredBy: goals[0].scoredBy, assistedBy: goals[0].assistedBy},
                {scoredBy: goals[1].scoredBy, assistedBy: goals[1].assistedBy},
                {scoredBy: goals[2].scoredBy, assistedBy: goals[2].assistedBy}
            ]});
        });

        game.getGoals();

        var goalsElement = $('#markedGoals').find('li');
        goalsElement.each(function (idx, li) {
            var goal = $(li);
            expect(goal.html()).toEqual(goals[idx].scoredBy + " " + goals[idx].assistedBy);
        });
    });
});