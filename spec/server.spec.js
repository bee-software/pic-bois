var Server = require('../src/server.js');

describe("Server", function() {

	it("can be instantiated", function(done) {
		expect(new Server()).toNotBe(null);
		done();
	});
	
});