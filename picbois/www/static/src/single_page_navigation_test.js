/*global describe, beforeEach, spyOn, it, expect */

describe("Single page navigation", function(){

    beforeEach(function(){
        setFixtures('<div id="main"/>');
    });

    it("contains an empty div as the main area", function(){
        expect($('#main').is('div')).toBeTruthy();
    });

    it("loads the home page content in the main area on load", function(){
        spyOn($, "ajax").andCallFake(function (params) {params.success("Home page content");});

        var singlePage = new dhhr.SinglePage({});
        singlePage.onLoad();

        expect($.ajax.mostRecentCall.args[0].url).toBe('home.html');
        expect($('#main').html()).toEqual("Home page content");
    });

    it("loads the html page in the main area associated with the window.location.hash", function(){
        spyOn($, "ajax").andCallFake(function (params) {params.success("Anchored page content");});

        window.location.hash = "#AnchoredPage";
        var singlePage = new dhhr.SinglePage({'#AnchoredPage': 'anchoredPage.html'});
        singlePage.loadAnchoredPage();

        expect($.ajax.mostRecentCall.args[0].url).toBe('anchoredPage.html');
        expect($('#main').html()).toEqual("Anchored page content");
    });

    it("loads the home page in the main area when there is no page associated with the window.location.hash", function(){
        spyOn($, "ajax").andCallFake(function (params) {params.success("Home page content");});

        window.location.hash = "#MalformedAnchoredPage";
        var singlePage = new dhhr.SinglePage({'#AnchoredPage': 'anchoredPage.html'});
        singlePage.loadAnchoredPage();

        expect($.ajax.mostRecentCall.args[0].url).toBe('home.html');
        expect($('#main').html()).toEqual("Home page content");
    });

    it("loads previous state in the main area on a browser back event", function(){

    });

    it("loads next state in the main area on a browser forward event", function(){
    });
});