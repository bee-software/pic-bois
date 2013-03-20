Browser = require("zombie");

describe("submit goal", function() {

	var browser = new Browser();
	
	it("offers a way to submit a goal", function(done) {
		browser.visit("http://localhost:5000/goals/new", function () {
			browser.fill("#scoredBy", "23");
			browser.fill("#assistedBy", "10");
			browser.click("#submit", function() {
				expect(browser.text("#message")).toEqual("saved: goal scored by player 23 and assisted by player 10");
				done();
			});
		});
	});	
	
});
		
		
