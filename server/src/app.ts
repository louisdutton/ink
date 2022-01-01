import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import logger from './utils/logger';
import { version } from '../package.json';

import socket from './socket';

const port = 4000;
const host = 'localhost';
const corsOrigin = 'http://localhost:3000';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: corsOrigin,
		credentials: true
	}
});

app.get('/', (_, res) =>
	res.send(`Server is up and running version ${version}`)
);

httpServer.listen(port, host, () => {
	logger.info(`🚀 draw.ink server version ${version} is listening 🚀`);
	logger.info(`http://${host}:${port}`);

	socket({ io });
});
