import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin";

const app = initializeApp();
const db = app.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Add default user data to the firestore db on user creation.
exports.userCreated = functions.auth.user().onCreate((user) => {
	return db.doc(`users/${user.uid}`).set({
		username: user.displayName ?? "New User",
		badges: [],
	});
});

// Clean up userdata in the firestore db on user deletion.
exports.userDeleted = functions.auth.user().onDelete((user) => {
	return db.doc(`users/${user.uid}`).delete();
});
