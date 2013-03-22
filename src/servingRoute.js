var fs = require('fs');

servingRoute = function(folder) {
	
	return function (request, response) {
		if (request.url == "/goals/create") {
			var html = "<label id=message>" 
			+ "saved: goal scored by player 23 and assisted by player 10"
			+ "</label>";
			response.write(html);
		} else {
			response.write(fs.readFileSync(folder + '/goals.new.html'));
		}
		response.end();			
	};
	
	
};

module.exports = servingRoute;