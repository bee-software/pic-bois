/*global desc, task, jake, complete, fail */
(function () {
    "use strict";

    task("default", ["lint", "test"]);

    desc("Static code analysis");
    task("lint", function () {
        var lint = require("./build/lint_runner.js");
        var passed = lint.validateFileList(filesToLint(), lintOptions(), {});
        if (!passed) {
            fail("Lint failed");
        }
    });

    desc("Integration server task");
    task("integration", ["lint", "feature", "test"]);

    desc("Unit tests");
    task("test", ["jasmine"]);

    desc("Test nodeunit");
    task("nodeunit", function () {
        var nodeunit = require("./build/nodeunit_runner.js");
        nodeunit.runTests(nodeunitTestFiles(), complete, fail);
    }, {async: true});

    desc("Test jasmine");
    task("jasmine", function () {
        var jasminenode = require("./build/jasminenode_runner.js");
        jasminenode.runTests("./src/server", complete, fail);
    }, {async: true});

    desc("Test features");
    task("feature", function () {
        var jasminenode = require("./build/jasminenode_runner.js");
        jasminenode.runTests("./features", complete, fail);
    }, {async: true});

    desc("Start application localy");
    task("start", function () {
        var spawn = require("child_process").spawn;
        var node = spawn("./node_modules/.bin/forever", ["start", "src/server/web.js"]);
        node.stdout.on("data", logToConsole);
        node.stderr.on("data", logToConsole);
    });

    desc("Stop application localy");
    task("stop", function () {
        var spawn = require("child_process").spawn;
        var node = spawn("./node_modules/.bin/forever", ["stop", "src/server/web.js"]);
        node.stdout.on("data", logToConsole);
        node.stderr.on("data", logToConsole);
    });

    desc("Deploy application");
    task("deploy", function () {
        console.log("1. run git push heroku master");
        console.log("    or git push heroku branch:master (if not on master)");
        console.log("2. run release test (not written yet!)");
    });

    function filesToLint() {
        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("build");
        files.exclude("node_module");
        return files.toArray();
    }

    function nodeunitTestFiles() {
        var testFiles = new jake.FileList();
        testFiles.include("spec/*_test.js");
        testFiles.include("features/*_test.js");
        return testFiles.toArray();
    }

    function lintOptions() {
        return {
            // from ./node_modules/jshint/examples/.jshintrc
            bitwise: true,
            camelcase: true,
            curly: true,
            eqeqeq: true,
            forin: true,
            immed: true,
            indent: 4,
            latedef: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            plusplus: false,
            quotmark: "double",
            undef: true,
            unused: false, // not sure about this one, ask Eric
            strict: false, // not sure about this one, ask Eric
            trailing: true,
            maxdepth: 2,
            node: true
//            browser : true // for client-side code
        };
    }

    function logToConsole(data) {
        console.log(String(data));
    }

}());