// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDwAJDHN1NsP7R7e6z7l8f6YpREsIB0Hs4",
	authDomain: "draw-ink.firebaseapp.com",
	databaseURL:
		"https://draw-ink-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "draw-ink",
	storageBucket: "draw-ink.appspot.com",
	messagingSenderId: "285619681204",
	appId: "1:285619681204:web:5594c4077f5f257b6c64e1",
	measurementId: "G-GT9KQE2VQG",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const auth = getAuth(firebase);

// data
export const rooms = collection(db, "rooms");

export interface Message {
	type: "status" | "message";
	content: string;
	time: number;
	username: string;
}
