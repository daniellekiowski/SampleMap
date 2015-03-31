//Basic node server to serve static files

//Import modules
var http = require('http');
var static = require('node-static');

//Create and start server
var fileServer = new(static.Server)();

http.createServer(function(request,response){
	fileServer.serve(request,response);
}).listen(8080);