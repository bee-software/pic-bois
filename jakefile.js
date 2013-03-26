/*global desc, task, jake, complete, fail */

task("default", ["lint", "test"]);

desc("Static code analysis");
task("lint", function () {
    var lint = require("./build/lint_runner.js");
    var passed = lint.validateFileList(filesToLint(), lintOptions(), {});
    if (!passed) {
        fail("Lint failed");
    }
});

task("test", ["jasmine"]);

desc("Test nodeunit");
task("nodeunit", function () {
    var nodeunit = require("./build/nodeunit_runner.js");
    nodeunit.runTests(nodeunitTestFiles(), complete, fail);
}, {async: true});

desc("Test jasmine");
task("jasmine", function () {
    var jasminenode = require('./build/jasminenode_runner.js');
    jasminenode.runTests('./spec', complete, fail);
},{async: true});

desc("Test features");
task("feature", function () {
    var jasminenode = require('./build/jasminenode_runner.js');
    jasminenode.runTests('./features', complete, fail);
},{async: true});

desc("Start application localy");
task("start", function () {
    var spawn = require('child_process').spawn;
    var node = spawn('./node_modules/.bin/forever', ['start', 'src/web.js']);
    node.stdout.on('data', logToConsole);
    node.stderr.on('data', logToConsole);
});

desc("Stop application localy");
task("stop", function () {
    var spawn = require('child_process').spawn;
    var node = spawn('./node_modules/.bin/forever', ['stop', 'src/web.js']);
    node.stdout.on('data', logToConsole);
    node.stderr.on('data', logToConsole);
});

desc("Deploy application");
task("deploy", function(){
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
        // from http://www.jshint.com/docs/#options
        bitwise: true,
        curly: true,
        eqeqeq: true,
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

function logToConsole(data) {
    console.log(String(data));
}