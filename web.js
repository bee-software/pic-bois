Server = require("./src/server");
var servingRouteWithFolder = require("./src/servingRoute");

var server = new Server(servingRouteWithFolder("pages"));
server.start();