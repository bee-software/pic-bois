(function() {
	"use strict";

	var jasmine = require("jasmine-node");

	exports.runTests = function(testFiles, success, fail) {
        jasmine.executeSpecsInFolder(jasminenodeOptions(testFiles, done(success, fail)));
	};

    function jasminenodeOptions(testsFiles, done){
        return {
            specFolder: testsFiles,
            onComplete: done,
            isVerbose: true,
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
