// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyh1WN6ds7gU-sRHEFNJqhhEug6C9nF3Q",
    authDomain: "sd-ai-marketing.firebaseapp.com",
    databaseURL: "https://sd-ai-marketing-default-rtdb.firebaseio.com",
    projectId: "sd-ai-marketing",
    storageBucket: "sd-ai-marketing.appspot.com",
    messagingSenderId: "181908378801",
    appId: "1:181908378801:web:99042ce7aecc9234857e90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig),
    db = getDatabase(app);

// export db, ref, set
export { db, ref, set };
