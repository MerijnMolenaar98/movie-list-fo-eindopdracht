// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, collection, doc, getDoc} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBU8ZiYAYOa-al6yz5WwwR2zaNaiaeZw24",
    authDomain: "movie-list-2bb0d.firebaseapp.com",
    databaseURL: "https://movie-list-2bb0d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "movie-list-2bb0d",
    storageBucket: "movie-list-2bb0d.appspot.com",
    messagingSenderId: "692402235100",
    appId: "1:692402235100:web:5ce6a7c554dc9c210f7619"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function getFireBaseApp() {
    return app;
}

export function getFireBaseDatabase() {
    return getFirestore(app);
}

export async function getAverageRating(movieId) {
    let users = 0;
    let ratingTotal = 0;
    const querySnapshot = await getDocs(collection(getFireBaseDatabase(), "ratings"));
    querySnapshot.forEach((doc) => {
        if (doc.data().movies[movieId] !== undefined) {
            users += 1;
            ratingTotal += parseInt(doc.data().movies[movieId]);
        }
    });

    if (users === 0) {
        return 0;
    }

    return Math.round(ratingTotal / users);
}

export async function getRatingForUser(username, movieId) {
    const docRef = doc(getFireBaseDatabase(), "ratings", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        if (docSnap.get("movies")[movieId] !== undefined) {
            return docSnap.get("movies")[movieId];
        }
    }
    return 0;
}