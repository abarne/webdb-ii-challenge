const server = require('./server.js');

const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
	console.log(`\n=== API on port ${PORT} ===\n`);
});
