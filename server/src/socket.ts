import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';
import logger from './utils/logger';
import { Message } from './types';

const EVENTS = {
	connection: 'connection',
	CLIENT: {
		CREATE_ROOM: 'CREATE_ROOM',
		SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
		SEND_ROOM_DATA: 'SEND_ROOM_DATA',
		JOIN_ROOM: 'JOIN_ROOM',
		LEAVE_ROOM: 'LEAVE_ROOM'
	},
	SERVER: {
		ROOMS: 'ROOMS',
		JOINED_ROOM: 'JOINED_ROOM',
		LEFT_ROOM: 'LEFT_ROOM',
		ROOM_MESSAGE: 'ROOM_MESSAGE',
		ROOM_DATA: 'SEND_ROOM_DATA'
	}
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
	logger.info(`Sockets enabled`);

	io.on(EVENTS.connection, (socket: Socket) => {
		logger.info(`User connected ${socket.id}`);

		socket.emit(EVENTS.SERVER.ROOMS, rooms);

		// on room created
		socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
			console.log({ roomName });
			// create a roomId
			const roomId = nanoid();
			// add a new room to the rooms object
			rooms[roomId] = {
				name: roomName
			};

			socket.join(roomId);

			// broadcast an event saying there is a new room
			socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

			// emit back to the room creator with all the rooms
			socket.emit(EVENTS.SERVER.ROOMS, rooms);
			// emit event back the room creator saying they have joined a room
			socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
		});

		/** When a user sends a room message */
		socket.on(
			EVENTS.CLIENT.SEND_ROOM_MESSAGE,
			({ roomId, content, username }) => {
				socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
					type: 'message',
					content,
					username,
					time: Date.now()
				} as Message);
			}
		);

		// on draw data recieved
		socket.on(EVENTS.CLIENT.SEND_ROOM_DATA, (data) => {
			socket.to(data.roomId).emit(EVENTS.SERVER.ROOM_DATA, data);
		});

		// on room connection
		socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId, username) => {
			socket.join(roomId);
			socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);

			// announce connection
			socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
				type: 'status',
				content: 'joined',
				username,
				time: Date.now()
			} as Message);

			// on disconnect
			socket.on('disconnect', () => {
				// announce disconnection
				socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
					type: 'status',
					content: 'left',
					username,
					time: Date.now()
				} as Message);

				socket.leave(roomId);
			});
		});
	});
}

export default socket;
