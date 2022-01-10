import { Server, Socket } from 'socket.io';
import rooms, { Room, removeFromRoom, createRoom, User } from './rooms';
import msg, { Message } from './messages';
import EVENT from './events';
import { compareTwoStrings as similarity } from 'string-similarity';
import * as Theme from './theme';

// for testing only
const theme = Theme.GENERAL;
const charLimit = 128;
let targetWord = Theme.getRandomWord(theme);

/** Initialise the given SocketIO server. */
function socket(io: Server) {
	io.on(EVENT.connection, (socket: Socket) => {
		console.log(`${socket.id} connected`);

		// Client requesting room list
		socket.on('request-rooms', () => {
			socket.emit(EVENT.SERVER.ROOMS, rooms);
		});

		// on room created
		socket.on(
			EVENT.CLIENT.ROOM_CREATE,
			({ name, capacity, theme }, callback) => {
				// Create the room and log it's creation
				const rid = createRoom(name, capacity, theme);
				console.log(`${rid} created by ${socket.id}`);

				// Emit mutated room list to all
				// socket.broadcast.emit(EVENT.SERVER.ROOMS, rooms);
				// socket.emit(EVENT.SERVER.ROOMS, rooms);

				// Acknowledgement callback
				callback({ data: rid });
			}
		);

		// ON ROOM CONNECT
		socket.on(EVENT.CLIENT.ROOM_JOIN, ({ id, username }, callback) => {
			// ON ROOM DISCONNECT
			socket.on(EVENT.disconnect, () => {
				// announce disconnection
				socket.leave(id);
				console.log(`${socket.id} left ${id}`);

				socket.broadcast.to(id).emit(EVENT.SERVER.ROOM_LEAVE, username);
				socket.to(id).emit(EVENT.SERVER.MESSAGE, msg.status(username, 'left')); // TODO: this can be handled client side

				room.users = room.users.filter((user) => user.id !== id);
			});

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
			const newUser: User = {
				id: socket.id,
				username,
				score: 0
			};
			room.users.push(newUser);

			// Callback before arrive message is sent
			callback({ data: { id, users: room.users } });

			// Emit arrival messages to all sockets in the room (inclusive)
			socket.broadcast.to(id).emit(EVENT.SERVER.ROOM_JOIN, newUser); // TODO: this can be handled client side

			io.sockets
				.in(id)
				.emit(EVENT.SERVER.MESSAGE, msg.status(username, 'joined'));
		});

		// ON LEAVE ROOM
		socket.on(EVENT.CLIENT.ROOM_LEAVE, () => {
			// leave all rooms
			socket.rooms.forEach((roomId: string) => {
				if (roomId === socket.id) return;
				console.log(`${socket.id} left ${roomId}`);
				socket.leave(roomId);

				if (rooms[roomId]) removeFromRoom(socket, roomId);
			});

			// console.log(io.sockets.adapter.rooms);
			socket.emit(EVENT.SERVER.ROOMS, rooms);
		});

		// ON MESSAGE
		socket.on(
			EVENT.CLIENT.MESSAGE,
			({ roomId, content, username }: Message) => {
				// prevent boundary errors
				if (content.length > charLimit) return;

				const accuracy = similarity(content, targetWord);

				if (accuracy > 0.9) {
					socket.emit(EVENT.SERVER.MESSAGE, msg.status('', 'You guessed it!'));
				} else if (accuracy > 0.75) {
					socket.emit(
						EVENT.SERVER.MESSAGE,
						msg.status(`"${content}"`, 'is close!')
					);
				} else {
					// Guess is incorrect / just a message
					// Emit message to all sockets in room (exclusive)
					socket.broadcast
						.to(roomId!)
						.emit(EVENT.SERVER.MESSAGE, msg.message(username, content));
				}
			}
		);

		// ON DRAW
		socket.on(EVENT.CLIENT.DRAW, (data) => {
			socket.broadcast.to(data.roomId).emit(EVENT.SERVER.DRAW, data);
		});

		// ON DISCONNECT
		socket.on(EVENT.disconnect, () => console.log(`${socket.id} disconnected`));
	});
}

export default socket;
