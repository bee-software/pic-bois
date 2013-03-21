Browser = require("zombie");
Server = require("../src/server");
servingRouteWithFolder = require("../src/servingRoute");

describe("public/goals.new.html", function() {

	var page = "http://localhost:5000/goals/new";
	var server = new Server(servingRouteWithFolder("pages"));
	var browser = new Browser();
	
	beforeEach(function() {	
		server.start();
	});
	
	afterEach(function() {
		server.stop();
	});	
	
	describe("page's title", function() {
	
		it("is 'Enter a new goal'", function(done) {
			browser.visit(page).then(function () {
				expect(browser.text("title")).toEqual("Enter a new goal");
				done();
			});
		});
	});
	
	describe("page's element", function() {
		
		it("field to enter goal is ready", function(done) {
			browser.visit(page).then(function () {
		      	expect(browser.query("input#scoredBy")).toBeDefined();
				done();
			});
		});
		
		it("field to enter assistant is ready", function(done) {
			browser.visit(page).then(function () {
		      	expect(browser.query("input#assistedBy")).toBeDefined();
				done();
			});
		});
		
		it("button to submit form is ready", function(done) {
			browser.visit(page).then(function () {
		      	expect(browser.text("button#submit")).toEqual("save!");
				done();
			});
		});

	});
		
});