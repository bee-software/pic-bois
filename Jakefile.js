/*global desc, task, jake, complete, fail */
(function () {
    "use strict";

    task("default", function() {
        jake.Task.lint.invoke();
        jake.Task.test.invoke();
    });

    desc("Static code analysis");
    task("lint", function () {
        var lint = require("./build/lint_runner.js");
        lint.validateFileList(filesToLint(), lintOptions(), {}, complete, fail);
    });

    desc("Tests");
    task("test", function () {
        var jasminenode = require("./build/jasminenode_runner.js");
        jasminenode.runTests(".", complete, fail);
    }, {async: true});

    desc("Start application localy");
    task("start", function () {
        run("./node_modules/.bin/forever", ["start", "src/server/application.js"]);
    });

    desc("Stop application localy");
    task("stop", function () {
        run("./node_modules/.bin/forever", ["stop", "src/server/application.js"]);
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
            unused: false,
            strict: false,
            trailing: true,
            maxdepth: 2,
            node: true
//            browser : true // for client-side code
        };
    }


    function run(command, params) {
        var spawn = require("child_process").spawn;
        var node = spawn(command, params);
        node.stdout.on("data", logToConsole);
        node.stderr.on("data", logToConsole);
    }

    function logToConsole(data) {
        console.log(String(data));
    }
}());