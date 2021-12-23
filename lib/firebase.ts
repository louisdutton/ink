import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInAnonymously } from 'firebase/auth';

const clientCredentials = {
	apiKey: process.env.FB_API_KEY,
	authDomain: process.env.FB_AUTH_DOMAIN,
	projectId: process.env.FB_PROJECT_ID,
	storageBucket: process.env.FB_STORAGE_BUCKET,
	messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
	appId: process.env.FB_APP_ID
} as FirebaseOptions;

export const firebase = initializeApp(clientCredentials);
export const firestore = getFirestore(firebase);
export const messages = collection(firestore, 'messages');

export const auth = getAuth();
signInAnonymously(auth)
	.then((a) => {
		console.log(a.user.displayName);
		// Signed in..
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		// ...
	});
