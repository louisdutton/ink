import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socket from './socket';
import next from 'next';

const port = (process.env.PORT || 3000) as number;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
	const app = express();
	const server = createServer(app);
	const io = new Server(server);

	// Initalise socketIO
	socket(io);

	app.all('*', (req: any, res: any) => nextHandler(req, res));

	server.listen(port, () => {
		console.log(`🚀 Inky winky lets get dinky! 🚀`);
		console.log(`Running: https://localhost:${port}`);
		// io init used to be here
	});
});
