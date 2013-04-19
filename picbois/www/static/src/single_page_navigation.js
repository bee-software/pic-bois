var dhhr = {};

(function () {
    "use strict";
    var HOME = 'home.html';

    var SinglePage = dhhr.SinglePage = function(routes) {
        this.routes = routes;
    };

    SinglePage.prototype.onLoad = function(){
        _loadPageInMainArea(HOME);
    };

    SinglePage.prototype.loadAnchoredPage = function() {
        var page = this.getPageFromHash();
        _loadPageInMainArea(page);
    };

    SinglePage.prototype.getPageFromHash = function() {
        return this.routes[window.location.hash] || HOME;
    };

    function _loadPageInMainArea(page) {
        $.get(page, function (content) { _fillMainAreaWith(content) });
    }

    function _fillMainAreaWith(content) {
        $("#main").html(content);
    }

}());