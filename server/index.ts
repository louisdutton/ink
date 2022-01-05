import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socket from './socket';
import next from 'next';

// Config
const port = (process.env.PORT || 3000) as number;
const dev = process.env.NODE_ENV !== 'production';

// Create next server
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// Initalisse Next server
nextApp.prepare().then(async () => {
	// Create http -> SocketIO server
	const app = express();
	const server = createServer(app);
	const io = new Server(server);

	// Initialise SocketIO server
	socket(io);

	// Delegate all http requests to the Next http handler
	app.all('*', (req: any, res: any) => nextHandler(req, res));

	server.listen(port, () => {
		console.log(`🚀 Inky winky lets get dinky! 🚀`);
		console.log(`Server is listening on: https://localhost:${port}`);
	});
});
