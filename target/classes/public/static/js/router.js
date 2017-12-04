var http = require('http');

var createRouter = function (port){

	var api={};
	var routes = {};
	var methods = ['GET', 'POST', 'OPTIONS'];

	methods.forEach(function (method){
		routes[method] = {};
		api[method.toLowerCase()] = function (path, fn){
			routes[method][path] = fn;
		}
	});

	var handleBody = function (req, res, next) {
		var body = [];
		req.on('data', function (chunk ){
			body.push(chunk);
		});
		req.on('end', function (){
			req.body = Buffer.concat(body).toString();
			next();
		})
	}

	http.createServer(function (req, res) {
		handleBody(req, res, function (){
			res.setHeader('Access-Control-Allow-Origin', '*');
			//res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
			if (!routes[req.method][req.url]){
				res.statusCode = 404;
				return res.end();	
			} 
			routes[req.method][req.url](req, res);
		});
	}).listen(port);

	return api;

};

module.exports = createRouter;