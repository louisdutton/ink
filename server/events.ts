// WebSocket events
export default {
	connection: 'connection',
	disconnect: 'disconnect',
	CLIENT: {
		ROOM_CREATE: 'create-room',
		ROOM_JOIN: 'join-room',
		ROOM_LEAVE: 'leave-room',
		MESSAGE: 'send-message',
		DRAW: 'send-draw'
	},
	SERVER: {
		ROOMS: 'rooms',
		ROOM_CREATE: 'room-created',
		ROOM_JOIN: 'room-joined',
		MESSAGE: 'message-recieved',
		DRAW: 'draw-recieved'
	}
};
