export const SOCKET_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:4000'
		: 'https://draw-dot-ink.herokuapp.com:4000';
