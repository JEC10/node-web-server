// refactored middleware to a separate file

var middleware = {  													
	requireAuthentication: function (req, res, next) {
		console.log('private route hit!');
		next();
	},
	logger: function (req, res, next) {					
		console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
		next();
	}
};

// add variable to module.exports so that files that require middleware.js can access the code
module.exports = middleware;