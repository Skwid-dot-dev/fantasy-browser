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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const firebaseAuthFunctions = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    setPersistence,
    Auth: {
        Persistence: {
            LOCAL: browserLocalPersistence,
            SESSION: browserSessionPersistence
        }
    }
};

const firebase = {
    saveCharacter: async (characterData) => {
        if (!auth.currentUser) throw new Error("Not logged in");
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, "characters", uid);
        await setDoc(userDocRef, characterData);
    },
    loadCharacter: async () => {
        if (!auth.currentUser) return null;
        const uid = auth.currentUser.uid;
        const userDocRef = doc(db, "characters", uid);
        const docSnap = await getDoc(userDocRef);
        return docSnap.exists() ? docSnap.data() : null;
    }
};

export { auth, firebaseAuthFunctions, firebase };
