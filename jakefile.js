/*global desc, task */

task("default", ["lint"]);

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