Creation = require('../src/creation.js');

describe("Creation", function() {

	var creation = new Creation();
	var template = { toString : function() { } };
	
	beforeEach(function() {
		spyOn(template, 'toString').andReturn("<any>this message is awesome</any>");
		creation.setMessageTemplate(template);
	});

	it("reads the message from a template", function(done) {
		response = { write : function() {} };
		creation.execute({}, response);
		
		expect(template.toString).toHaveBeenCalled();
		done();
	});
	
	it("insert the correct message into the template", function(done) {
		response = { write : function() {} };
		spyOn(response, 'write');
		creation.execute({}, response);
		
		expect(response.write).toHaveBeenCalledWith("<any>saved: goal scored by player 23 and assisted by player 10</any>");
		done();
	});
	
});