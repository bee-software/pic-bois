function Server(serving) {
	this.serving = serving;
};

Server.prototype.start = function() {
	this.server = require('http').createServer(this.serving).listen(process.env.PORT || 5000, 'localhost');		
};

Server.prototype.stop = function() {
	this.server.close();
};

module.exports = Server;