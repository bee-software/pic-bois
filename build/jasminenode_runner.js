// Copyright (c) 2012 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
(function() {
	"use strict";

	var jasminenode = require("jasmine-node");

	var REPORTER = "default";

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