/*global describe, loadFixtures, it, expect */

describe("Marked goals", function(){
    "use strict";

    it("contains a placeholder for marked goals", function(){
        loadFixtures('new_goal.html');
        expect($('#markedGoals').is('ul')).toBeTruthy();
    });
});