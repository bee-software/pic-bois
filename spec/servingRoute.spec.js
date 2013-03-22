var request = require('request');
var fs = require('fs');
var servingRouteWithFolder = require('../src/servingRoute');

describe("Serving routes", function() {

	var server;
	var folder = 'spec/test-folder';
	
	beforeEach(function() {	
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);			
		server = require('http').createServer(servingRouteWithFolder(folder)).listen(5000);		
	});
	afterEach(function() {
		server.close();
	});
	
	it("is alive", function(done) {
		request("http://localhost:5000", function(error, response, body) {
			expect(error).toBe(null);
			done();
		});
	});
	
	it("can serve goals.new.html", function(done) {
		var content = 'what a wonderfull world';
		fs.writeFileSync(folder + '/goals.new.html', content);
		
		request("http://localhost:5000/goals/new", function(error, response, body) {
			expect(body).toEqual(content);
			done();
		});
	});
	
	it("serves confirmation message as html content", function(done) {
		request("http://localhost:5000/goals/create", function(error, response, body) {
			expect(response.headers['content-type']).toEqual("text/html");
			done();
		});
	});
	
});