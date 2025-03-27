import HTTP from 'node:http';

const DEFAULT_PORT = 5500;
const PORT = process.env.PORT || DEFAULT_PORT;
const server = HTTP.createServer((request, response) => {
	response.writeHead(200, {
		"Access-Control-Allow-Origin": "https://replit.com",
		"Access-Control-Allow-Methods": "GET, PING, OPTIONS",
		"Content-Type": "text/html"
	} as const);
	response.end("<h3>Copy me, the url above!</h3>");
});

export default (): void => {
	const startServer = (port: number): void => {
		server.listen(port)
			.on('listening', () => console.log(`Server for UptimeRobot is ready on port ${port}!`))
			.on('error', (err: NodeJS.ErrnoException) => {
				if (err.code === 'EADDRINUSE') {
					console.log(`Port ${port} is in use, trying port ${port + 1}`);
					startServer(port + 1);
				} else {
					console.error('Server error:', err);
				}
			});
	};

	startServer(Number(PORT));
};