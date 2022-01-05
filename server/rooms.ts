import { Socket } from 'socket.io';

export interface Room {
	name: string;
	users: string[];
	capacity: number;
	theme: string;
}

/** eg: `const room = rooms[key]`*/
const rooms: Record<string, Room> = {};
export default rooms;

// TODO: refactor this
export const removeFromRoom = (socket: Socket, id: string) => {
	const room = rooms[id];
	const userIndex = room.users.indexOf(socket.id);
	if (userIndex > -1) {
		room.users.splice(userIndex, 1);

		if (room.users.length < 1) {
			delete rooms[id];
		}
	}
};
