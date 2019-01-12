const http = require("http");
const config = require("./configurations.js");
const GetCode = require("./server/GetCode.js");

http.createServer(function (request, response) {
	GetCode.process(request, response);

}).listen(config.lServerPort);
console.log(`Server running at ${config.lServerHost}:${config.lServerPort}/`);
