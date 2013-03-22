Creation = require('../src/creation.js');

describe("Creation", function() {

	var creation = new Creation();

	it("writes the message in the response", function(done) {
		response = { write : function() {} };
		spyOn(response, 'write');
		creation.execute({}, response);
		
		expect(response.write).toHaveBeenCalledWith("<label id=message>saved: goal scored by player 23 and assisted by player 10</label>");
		done();
	});
	
});