Server = require("./src/server");
var servingRouteWithFolder = require("./src/servingRoute");

var server = new Server(servingRouteWithFolder("pages"));

module.exports = server;

if(require.main === module) {
	server.start();
}