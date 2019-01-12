const fs = require("fs-extra");
const path = require('path');
const qs = require('querystring');
const url = require('url');
const config = require("../configurations.js");

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpg',
	'.gif': 'image/gif',
	'.wav': 'audio/wav',
	'.mp4': 'video/mp4',
	'.woff': 'application/font-woff',
	'.ttf': 'application/font-ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'application/font-otf',
	'.svg': 'application/image/svg+xml',
	'.m': 'application/txt'
};

const Get = {
	getFilePath: function(request) {
		let filePath = '.' + request.url;

		if (filePath == './') {
			filePath = './index.html';
		}

		let stripPos = filePath.indexOf("?");
		if (stripPos > 0) {
			filePath = filePath.substring(0, stripPos);
		}

		filePath = decodeURI(filePath);
		return filePath;
	},

	getFileExt: function(filePath) {
		var extName = String(path.extname(filePath)).toLowerCase();
		return extName;
	},

	getQS: function(filePath) {

	},

	readFile: function(filePath, response) {
		var contentType = mimeTypes[Get.getFileExt(filePath)] || 'application/txt'; // 'application/octet-stream';

		fs.readFile(filePath, function(error, content) {
			if (error) {
				if (error.code == 'ENOENT') {
					fs.readFile('./404.html', function(error, content) {
						response.writeHead(200, {
							'Content-Type': contentType
						});
						response.end(content, 'utf-8');
					});
				} else {
					response.writeHead(500);
					response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
					response.end();
				}
			} else {
				response.writeHead(200, {
					'Content-Type': contentType
				});
				response.end(content, 'utf-8');
			}
		});
	},


	callServer: function(URL, type, response, dataHandler) {
		let rpcInfo = "";

		axios.get(URL, {
				headers: {
					"Accept": "application/json",
					"Authorization": "Basic " + auth,
					"Access-Control-Allow-Origin": '*'
				}
			})
			.then(rData => {
				let theData = dataHandler(rData);
				response.write(theData);
				response.end();
			})
			.catch(error => {
				let errMsg = `\n-------------- callServer ${type} ERROR --------------`;
				errMsg += `\nHeaders: ${JSON.stringify(error.config.headers, null, 2)}`;
				errMsg += `\n${error.config.url}`;
				if (error.response) {
					errMsg += `\n${error.response.status} - ${error.response.statusText}`;
				}
				else {
					errMsg += `\nNo Response from the server`;
				}
				errMsg += `\n-------------- callServer ${type} ERROR --------------`;
				console.log(errMsg);
				rpcInfo = error;
			});
		return (rpcInfo);
	},


	routeProc: function(request, response) {
		const thePath = this.getFilePath(request);
		const routes = {
			"./favicon.ico": function() {
				response.write("");
				response.end();
			},
			"./index.html": function() {
				Get.readFile(thePath, response);
				return "default";
			},
			"default": function() {
				Get.readFile(thePath, response);
				return "default";
			}
		};

		const resp = (routes[thePath] || routes['default'])();
	},

	process: function(request, response) {
		const queryData = url.parse(request.url, true).query;
		this.routeProc(request, response);
	}
}

module.exports = Get;
