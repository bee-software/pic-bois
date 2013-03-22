/*global desc, task, jake, complete, fail */

task("default", ["lint", "test"]);

desc("Static code analysis");
task("lint", function () {
    var lint = require("./build/lint_runner.js");
    lint.validateFileList(filesToLint());
});

function filesToLint() {
    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("build");
    files.exclude("node_module");
    return files.toArray();
}

desc("Test features");
task("feature", function () {
    var spawn = require('child_process').spawn;
    var jasmineNode = spawn('./node_modules/.bin/jasmine-node', [ './features' , '--captureExceptions']);

    function logToConsole(data) {
        console.log(String(data));
    }

    jasmineNode.stdout.on('data', logToConsole);
    jasmineNode.stderr.on('data', logToConsole);
});

desc("Test node.js code");
task("test", function () {
    var nodeunit = require("./build/nodeunit_runner.js");
    nodeunit.runTests(nodeFilesToTest(), complete, fail);
}, {async: true});

function nodeFilesToTest() {
    var testFiles = new jake.FileList();
    testFiles.include("src/*_test.js");
    return testFiles.toArray();
}


