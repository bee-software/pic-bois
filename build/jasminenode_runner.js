(function() {
	"use strict";

	exports.runTests = function(testFiles, success, fail) {
        var jasmine = require("jasmine-node");
        jasmine.executeSpecsInFolder(jasminenodeOptions(testFiles, done(success, fail)));
	};

    function jasminenodeOptions(testsFiles, done){
        return {
            specFolder: testsFiles,
            onComplete: done,
            isVerbose: false,
            showColors: true,
            teamcity: false,
            useRequireJs: false,
            junitreport: false,
            includeStackTrace: true
        }
    }

    function done(success, fail){
        return function (runner){
            if (runner.results().failedCount === 0) success();
            else fail("Tests failed")
        }
    }

}());
