import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';
import rooms, { Room, removeFromRoom } from './rooms';
import msg from './messages';
import EV from './events';

function socket(io: Server) {
	console.log('Websockets are enabled');

	io.on(EV.connection, (socket: Socket) => {
		console.log(`${socket.id} connected`);

		socket.emit(EV.SERVER.ROOMS, rooms);

		// on room created
		socket.on(EV.CLIENT.ROOM_CREATE, ({ name, capacity, theme }, callback) => {
			// Add a new room to the rooms object (key = 4-char nanoid)
			const id = nanoid(4);
			rooms[id] = {
				name,
				users: [],
				capacity,
				theme
			};

			console.log(`${id} created by ${socket.id}`);

			// emit new room list to all but client
			socket.broadcast.emit(EV.SERVER.ROOMS, rooms);

			// emit new room list to the client
			socket.emit(EV.SERVER.ROOMS, rooms);
			callback(id);
		});

		// on room connection
		socket.on(EV.CLIENT.ROOM_JOIN, ({ id, username }, callback) => {
			// ensure socket does not already exist in room
			const room = rooms[id];

			// room doesnt exist
			if (!room) {
				console.log(`room ${id} does not exist on the server`);
				return;
			}

			// user already in room
			if (socket.rooms.has(id)) {
				console.log(`${id} is already present in ${socket.id}`);
				return;
			}

			console.log(`${socket.id} joined ${id}`);
			// Join room and emit id back to the source socket
			socket.join(id);
			// socket.emit(EV.SERVER.JOINED_ROOM, socket.id);

			// add socket to the list of users in the room
			room.users.push(socket.id);

			// emit announcment to all sockets in room (including self)
			socket.to(id).emit(EV.SERVER.MESSAGE, msg.status(username, 'joined'));

			// on disconnect
			socket.on(EV.disconnect, () => {
				// announce disconnection
				socket.leave(id);
				console.log(`${socket.id} left ${id}`);
				socket.to(id).emit(EV.SERVER.MESSAGE, msg.status(username, 'left'));

				const userIndex = room.users.indexOf(socket.id);
				if (userIndex > -1) room.users.splice(userIndex, 1);
			});

			callback();
		});

		socket.on(EV.CLIENT.ROOM_LEAVE, () => {
			// leave all rooms
			socket.rooms.forEach((roomId: string) => {
				console.log(`${socket.id} left ${roomId}`);
				socket.leave(roomId);

				if (rooms[roomId]) removeFromRoom(socket, roomId);
			});

			console.log(io.sockets.adapter.rooms);
			socket.emit(EV.SERVER.ROOMS, rooms);
		});

		// on user message send
		socket.on(EV.CLIENT.MESSAGE, ({ roomId, content, username }) => {
			socket.to(roomId).emit(EV.SERVER.MESSAGE, msg.message(username, content));
		});

		// on draw data recieved
		socket.on(EV.CLIENT.DRAW, (data) => {
			socket.broadcast.to(data.roomId).emit(EV.SERVER.DRAW, data);
		});

		socket.on(EV.disconnect, () => console.log(`${socket.id} disconnected`));
	});
}

export default socket;
