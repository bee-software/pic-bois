Creation = require("../src/creation");

describe("Creation", function() {

	var creation = new Creation();
	var template = { toString : function() { } };
	var response = { write : function() {}, end : function(){} };
	
	beforeEach(function() {
		spyOn(template, "toString").andReturn("<any>this message is awesome</any>");
		creation.setMessageTemplate(template);
	});

	it("reads the message from a template", function(done) {
		creation.execute(null, null, response);
		
		expect(template.toString).toHaveBeenCalled();
		done();
	});
	
	it("insert the correct message into the template", function(done) {
		spyOn(response, "write");
		creation.execute("23", "10", response);
		
		expect(response.write).toHaveBeenCalledWith("<any>saved: goal scored by player 23 and assisted by player 10</any>");
		done();
	});
		
});