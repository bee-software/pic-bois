var fs = require('fs');
Creation = require('./creation');

servingRoute = function(folder) {

	var creation = new Creation();
	creation.setMessageTemplate(fs.readFileSync(folder + '/message.html'));
	
	return function (request, response) {
		response.setHeader("content-type", "text/html");
		if (request.url == "/goals/create") {
			creation.execute(request, response);
		} else {
			response.write(fs.readFileSync(folder + '/goals.new.html'));
		}
		response.end();			
	};
};

module.exports = servingRoute;