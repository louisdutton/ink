import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const config: FirebaseOptions = {
	apiKey: 'AIzaSyDwAJDHN1NsP7R7e6z7l8f6YpREsIB0Hs4',
	authDomain: 'draw-ink.firebaseapp.com',
	databaseURL:
		'https://draw-ink-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'draw-ink',
	storageBucket: 'draw-ink.appspot.com',
	messagingSenderId: '285619681204',
	appId: '1:285619681204:web:5594c4077f5f257b6c64e1',
	measurementId: 'G-GT9KQE2VQG'
};

const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
