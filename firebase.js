// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, sendEmailVerification, sendPasswordResetEmail, setPersistence, 
  browserLocalPersistence, browserSessionPersistence 
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFuK9Tf89hwAG7L_is8NY00kn-Y44E8Qg",
  authDomain: "fantasy-browser-5de23.firebaseapp.com",
  projectId: "fantasy-browser-5de23",
  storageBucket: "fantasy-browser-5de23.appspot.com",
  messagingSenderId: "976083957249",
  appId: "1:976083957249:web:720073a57c62074df0b200",
  measurementId: "G-SYQLZKXBRG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Export if needed elsewhere, or remove if not used
const auth = getAuth(app);
const db = getFirestore(app);

// Custom Firebase interaction functions
const firebase = {
    saveCharacter: async (characterData) => {
        // Assumes auth.currentUser is available and set by the calling context (e.g., after login)
        // This could be improved by passing UID directly if auth instance isn't managed here.
        if (!auth.currentUser) throw new Error("User not authenticated for saveCharacter.");
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, "characters", uid);
        await setDoc(userDocRef, characterData);
    },
    loadCharacter: async () => {
        // Assumes auth.currentUser is available
        if (!auth.currentUser) {
            console.warn("User not authenticated for loadCharacter.");
            return null;
        }
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, "characters", uid);
        const docSnap = await getDoc(userDocRef);
        return docSnap.exists() ? docSnap.data() : null;
    }
};

// Export the initialized services and specific functions
export { 
    auth, 
    db,
    // Firebase Auth functions
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    sendPasswordResetEmail, 
    setPersistence, 
    // Firebase Auth persistence types
    browserLocalPersistence, 
    browserSessionPersistence,
    // Custom character functions
    firebase 
};
