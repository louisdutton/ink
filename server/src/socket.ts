import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';
import logger from './utils/logger';
import { Message, Room } from './types';

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
		CREATED_ROOM: 'CREATED_ROOM',
		JOINED_ROOM: 'JOINED_ROOM',
		LEFT_ROOM: 'LEFT_ROOM',
		ROOM_MESSAGE: 'ROOM_MESSAGE',
		ROOM_DATA: 'SEND_ROOM_DATA'
	}
};

/** Object access is more efficient than arrays. eg: `const room = rooms[key]`*/
const rooms: Record<string, Room> = {};

function socket({ io }: { io: Server }) {
	logger.info(`Sockets enabled`);

	io.on(EVENTS.connection, (socket: Socket) => {
		logger.info(`User connected ${socket.id}`);

		socket.emit(EVENTS.SERVER.ROOMS, rooms);

		// on room created
		socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ name, capacity, theme }) => {
			logger.info(`User ${socket.id} created room: ${name}`);

			// Add a new room to the rooms object (key = 4-char nanoid)
			rooms[nanoid(4)] = {
				name,
				users: [],
				capacity,
				theme
			};

			// emit new room list to all but client
			socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

			// emit new room list to the client
			socket.emit(EVENTS.SERVER.ROOMS, rooms);
		});

		// on user message send
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
			rooms[roomId].users.push(socket.id);

			// announce connection
			const joinMessage: Message = {
				type: 'status',
				content: 'joined',
				username,
				time: Date.now()
			};
			socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, joinMessage);
			socket.emit(EVENTS.SERVER.ROOM_MESSAGE, joinMessage);

			// on disconnect
			socket.on('disconnect', () => {
				// announce disconnection
				socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
					type: 'status',
					content: 'left',
					username,
					time: Date.now()
				} as Message);

				const userIndex = rooms[roomId].users.indexOf(socket.id);
				if (userIndex > -1) rooms[roomId].users.splice(userIndex, 1);
			});
		});
	});
}

export default socket;
