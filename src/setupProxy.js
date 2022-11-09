const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
	app.use(
		createProxyMiddleware('/api', {
			// target: 'http://localhost:3001/',
			target: 'http://146.56.45.3:8080/',
			changeOrigin: true
		})
	)
};