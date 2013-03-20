var fs = require('fs');

servingRoute = function(folder) {
	
	return function (request, response) {
		response.write(fs.readFileSync(folder + '/goals.new.html'));
		response.end();			
	};
	
	
};

module.exports = servingRoute;