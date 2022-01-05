import { Socket } from 'socket.io';
import { nanoid } from 'nanoid';

// just some placeholder examples
export type theme = 'general' | 'animals' | 'verbs';

/** `name` `users` `capacity` `theme` */
export interface Room {
	name: string;
	users: string[];
	capacity: number;
	theme: theme;
}

/** Mutable room Record. */
const rooms: Record<string, Room> = {};
export default rooms;

/** Creates a new room and returns the roomId. */
export const createRoom = (name: string, capacity: number, theme: theme) => {
	// Generate 6-digit uid as primary key
	const rid = nanoid(6);

	// Add room to records
	rooms[rid] = {
		name,
		users: [],
		capacity,
		theme
	};

	return rid;
};

/** Deletes the room with  . */
export const deleteRoom = (rid: string) => {
	if (rooms[rid]) {
		delete rooms[rid];
		console.log(`Room: ${rid} deleted`);
	}
};

/** Removes the given `socket` from the room with the given `rid`. */
export const removeFromRoom = (socket: Socket, rid: string) => {
	const room = rooms[rid];

	// Catch non-existent room
	if (!room) {
		console.log(
			`Removing User: ${socket.id} failed as Room: ${rid} does not exist`
		);
		return;
	}

	// Filter out the socket id
	room.users = room.users.filter((id) => id !== socket.id);
	console.log(`Removed User: ${socket.id} from Room: ${rid}`);

	// Delete room if empty
	if (room.users.length < 1) {
		deleteRoom(rid);
	}
};
