var fs = require('fs');
var qs = require('querystring');
Creation = require('./creation');


servingRoute = function(folder) {

	var creation = new Creation();
	creation.setMessageTemplate(fs.readFileSync(folder + '/message.html'));
	
	return function (incomingMessage, response) {
		response.setHeader("content-type", "text/html");
		
		if (incomingMessage.url == "/goals/create") {
			
			var body = "";
			incomingMessage.on('data', function(chunk) {
				body += chunk;
			});
			
			incomingMessage.on('end', function() {
				params = qs.parse(body);
				creation.execute(params.scoredBy, params.assistedBy, response);
			});
			
		} 
		
		if (incomingMessage.url == '/goals/new') {
			response.write(fs.readFileSync(folder + '/goals.new.html'));
			response.end();			
		}
		
		response.end();
	};
};

module.exports = servingRoute;