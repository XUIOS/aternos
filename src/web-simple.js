import HTTP from 'node:http';

const DEFAULT_PORT = 5500;
const PORT = process.env.PORT || DEFAULT_PORT;
const server = HTTP.createServer((request, response) => {
	response.writeHead(200, {
		"Access-Control-Allow-Origin": "https://replit.com",
		"Access-Control-Allow-Methods": "GET, PING, OPTIONS",
		"Content-Type": "text/html"
	});
	response.end("<h3>Copy me, the url above!</h3>");
});

export default () => {
	const startServer = (port) => {
		// Remove any previous listeners to avoid multiple handlers
		server.removeAllListeners('listening');
		server.removeAllListeners('error');
		
		// Add new listeners for this attempt
		server.once('listening', () => {
			console.log(`Server for UptimeRobot is ready on port ${port}!`);
		});
		
		server.once('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				console.log(`Port ${port} is in use, trying port ${port + 1}`);
				// Close server before trying a new port to ensure clean state
				server.close();
				startServer(port + 1);
			} else {
				console.error('Server error:', err);
			}
		});
		
		server.listen(port);
	};

	startServer(Number(PORT));
}; 