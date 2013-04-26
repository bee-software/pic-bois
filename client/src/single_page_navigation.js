var singlePage = {};

(function () {
    "use strict";
    var HOME = 'home.html';
    var routes = [];

    singlePage.initialize = function(){
        singlePage.loadAnchoredPage();
    };

    singlePage.loadAnchoredPage = function() {
        var page = _getPageFromHash();
        _loadPageInMainArea(page);
    };

    singlePage.addLink = function(link, page){
        var href = '#'+link;
        var a = $('<a/>', {
            id: link,
            href: href,
            html: link
        });
        a.click(singlePage.loadAnchoredPageOnClick);
        a.appendTo($("#links"));
        routes[href] = page;
    };

    singlePage.loadAnchoredPageOnClick = function(a) {
        var hash = a.target.hash;
        var page = routes[hash] || HOME;
        _loadPageInMainArea(page);
    };

    function _getPageFromHash() {
        return routes[window.location.hash] || HOME;
    }

    function _loadPageInMainArea(page) {
        $.get(page, function (content) { _fillMainAreaWith(content); });
    }

    function _fillMainAreaWith(content) {
        $("#main").html(content);
    }

}());