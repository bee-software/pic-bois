var dhhr = {};

(function () {
    "use strict";

    var SinglePage = dhhr.SinglePage = function(anchoredRoutes) {
        this.anchoredRoutes = anchoredRoutes;
    };

    SinglePage.prototype.onLoad = function(){
        _loadPageInMainArea('home.html');
    };

    SinglePage.prototype.loadAnchoredPage = function(){
        var page = this.anchoredRoutes[window.location.hash];
        _loadPageInMainArea(page);
    };

    function _loadPageInMainArea(page) {
        $.get(page, function (content) { _fillMainAreaWith(content) });
    }

    function _fillMainAreaWith(content) {
        $("#main").html(content);
    }

}());