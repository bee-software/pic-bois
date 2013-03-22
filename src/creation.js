function Creation() {
	
};

Creation.prototype.execute = function(request, response) {
	response.write("<label id=message>saved: goal scored by player 23 and assisted by player 10</label>");
};

module.exports = Creation; 