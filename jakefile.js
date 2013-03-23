/*global desc, task, jake, complete, fail */

task("default", ["lint", "test"]);

desc("Static code analysis");
task("lint", function () {
    var lint = require("./build/lint_runner.js");
    lint.validateFileList(filesToLint(), lintOptions());
});


task("test", ["nodeunit", "jasmine"]);

desc("Test nodeunit");
task("nodeunit", function () {
    var nodeunit = require("./build/nodeunit_runner.js");
    nodeunit.runTests(nodeunitTestFiles(), complete, fail);
}, {async: true});

desc("Test jasmine");
task("jasmine", function () {
    var spawn = require('child_process').spawn;
    console.log(jasmineTestFiles());
    var jasmineNode = spawn('./node_modules/.bin/jasmine-node', [ './spec' , '--captureExceptions']);

    function logToConsole(data) {
        console.log(String(data));
    }

    jasmineNode.stdout.on('data', logToConsole);
    jasmineNode.stderr.on('data', logToConsole);
});

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

desc("Start application");
task("start", function () {
    var spawn = require('child_process').spawn;
    var node = spawn('./node_modules/.bin/forever', ['start', 'web.js']);

    function logToConsole(data) {
        console.log(String(data));
    }

    node.stdout.on('data', logToConsole);
    node.stderr.on('data', logToConsole);
});


desc("Stop application");
task("stop", function () {
    var spawn = require('child_process').spawn;
    var node = spawn('./node_modules/.bin/forever', ['start', 'web.js']);

    function logToConsole(data) {
        console.log(String(data));
    }

    node.stdout.on('data', logToConsole);
    node.stderr.on('data', logToConsole);
});


function filesToLint() {
    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("build");
    files.exclude("node_module");
    return files.toArray();
}

function jasmineTestFiles() {
    var testFiles = new jake.FileList();
    testFiles.include("./spec/*.spec.js");
    testFiles.exclude("./spec/goals.new.html.spec.js");
    return testFiles.toArray().toString();
}

function nodeunitTestFiles() {
    var testFiles = new jake.FileList();
    testFiles.include("spec/*_test.js");
    testFiles.include("features/*_test.js");
    return testFiles.toArray();
}

function lintOptions() {
    return {
        // from http://www.jshint.com/docs/#options
        bitwise: true,
        curly: false,
        eqeqeq: false,
        forin: false,
        immed: false,
        latedef: false,
        newcap: false,
        noarg: false,
        noempty: false,
        nonew: false,
        regexp: false,
        undef: false,
        strict: false,
        trailing: false,
        node : true
    };
}
