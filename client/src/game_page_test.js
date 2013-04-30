/*global describe, beforeEach, jasmine, loadFixtures, it, expect, gamePage */

describe("Game page", function () {
    "use strict";

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = '/base/client';
    });

    it("contains a placeholder for marked goals", function () {
        loadFixtures('new_goal.html');
        expect($('#markedGoals').is('ul')).toBeTruthy();
    });

    it("shows a marked goal", function () {
        loadFixtures('new_goal.html');

        var goals = [
            {scoredBy: "11", assistedBy: "23"}
        ];
        gamePage.showGoals(goals);

        expect($('#markedGoals').find('li').html()).toEqual("11 23");
    });

    it("shows no goals if theres no marked goals", function () {
        loadFixtures('new_goal.html');

        var goals = [];
        gamePage.showGoals(goals);

        expect($('#markedGoals').find('li').html()).toEqual("No goals");
    });

    it("shows all received marked goal", function () {
        loadFixtures('new_goal.html');

        var goals = [
            {scoredBy: "11", assistedBy: "22"},
            {scoredBy: "1", assistedBy: "00"},
            {scoredBy: "5", assistedBy: ""}
        ];

        gamePage.showGoals(goals);

        var goalsElement = $('#markedGoals').find('li');
        goalsElement.each(function (idx, li) {
            var goal = $(li);
            expect(goal.html()).toEqual(goals[idx].scoredBy + " " + goals[idx].assistedBy);
        });
    });
});