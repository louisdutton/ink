import { Server, Socket } from 'socket.io';
import rooms, { Room, removeFromRoom, createRoom } from './rooms';
import msg from './messages';
import EV from './events';

/** Initialise the given SocketIO server. */
function socket(io: Server) {
	console.log('Websockets are enabled');

	io.on(EV.connection, (socket: Socket) => {
		console.log(`${socket.id} connected`);

		socket.emit(EV.SERVER.ROOMS, rooms);

		// on room created
		socket.on(EV.CLIENT.ROOM_CREATE, ({ name, capacity, theme }, callback) => {
			// Create the room and log it's creation
			const rid = createRoom(name, capacity, theme);
			console.log(`${rid} created by ${socket.id}`);

			// Emit mutated room list to all
			// socket.broadcast.emit(EV.SERVER.ROOMS, rooms);
			// socket.emit(EV.SERVER.ROOMS, rooms);

			// Acknowledgement callback
			callback({ data: rid });
		});

		// on room connection
		socket.on(EV.CLIENT.ROOM_JOIN, ({ id, username }, callback) => {
			// ensure socket does not already exist in room
			const room = rooms[id];

			// Ensure room exists
			if (!room) {
				const error = `Room: ${id} does not exist`;
				console.log(error);
				callback({ error });
				return;
			}

			// Ensure user is not already present in room
			if (socket.rooms.has(id)) {
				const error = `User: ${id} already present in Room: ${socket.id}`;
				console.log(error);
				callback({ error });
				return;
			}

			// Join the room
			socket.join(id);
			console.log(`${socket.id} joined ${id}`);

			// Add socket to the room's user list
			room.users.push(socket.id);

			// Emit arrival messages to all sockets in the room (inclusive)
			socket.to(id).emit(EV.SERVER.MESSAGE, msg.status(username, 'joined'));

			// ON ROOM DISCONNECT
			socket.on(EV.disconnect, () => {
				// announce disconnection
				socket.leave(id);
				console.log(`${socket.id} left ${id}`);
				socket.to(id).emit(EV.SERVER.MESSAGE, msg.status(username, 'left'));

				const userIndex = room.users.indexOf(socket.id);
				if (userIndex > -1) room.users.splice(userIndex, 1);
			});

			callback({ data: id });
		});

		// ON LEAVE ROOM
		socket.on(EV.CLIENT.ROOM_LEAVE, () => {
			// leave all rooms
			socket.rooms.forEach((roomId: string) => {
				console.log(`${socket.id} left ${roomId}`);
				socket.leave(roomId);

				if (rooms[roomId]) removeFromRoom(socket, roomId);
			});

			// console.log(io.sockets.adapter.rooms);
			socket.emit(EV.SERVER.ROOMS, rooms);
		});

		// ON MESSAGE
		socket.on(EV.CLIENT.MESSAGE, ({ roomId, content, username }) => {
			// Emit message to all sockets in room (inclusive)
			socket.to(roomId).emit(EV.SERVER.MESSAGE, msg.message(username, content));
		});

		// ON DRAW
		socket.on(EV.CLIENT.DRAW, (data) => {
			socket.broadcast.to(data.roomId).emit(EV.SERVER.DRAW, data);
		});

		// ON DISCONNECT
		socket.on(EV.disconnect, () => console.log(`${socket.id} disconnected`));
	});
}

export default socket;
