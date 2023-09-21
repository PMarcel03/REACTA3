import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyAaq2-QqSarxR0Bz0lSQ041AiHy8IM0XJ0",
        authDomain: "assign2and3.firebaseapp.com",
        projectId: "assign2and3",
        storageBucket: "assign2and3.appspot.com",
        messagingSenderId: "628021552721",
        appId: "1:628021552721:web:b9647cc5ab3b0a6288fa70",
        measurementId: "G-YRW8F5KN7Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)