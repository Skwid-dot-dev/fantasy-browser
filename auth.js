// auth.js
import { auth, firebaseAuthFunctions, firebase } from './firebase.js';
import { initMap, updateCharacterStatsUI } from './map.js';

export async function loadCharacterHandler() {
    try {
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        const userCredential = await firebaseAuthFunctions.signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        window.gameState.currentUser = user;

        const characterData = await firebase.loadCharacter();
        if (characterData) {
            window.gameState.character = characterData;
            initMap();
            document.getElementById('loginPanel').style.display = 'none';
            document.getElementById('gameContainer').style.display = 'block';
            updateCharacterStatsUI();
        } else {
            document.getElementById('authError').textContent = "No character found. Please register.";
        }
    } catch (err) {
        document.getElementById('authError').textContent = err.message;
    }
}

export function showRegisterForm() {
    document.getElementById("registrationFields").style.display = "block";
    document.getElementById("loginSpecificFields").style.display = "none";
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("switchToRegisterButton").style.display = "none";
    document.getElementById("completeRegisterButton").style.display = "inline-block";
    document.getElementById("backToLoginButton").style.display = "inline-block";
}

export function showLoginForm() {
    document.getElementById("registrationFields").style.display = "none";
    document.getElementById("loginSpecificFields").style.display = "block";
    document.getElementById("loginButton").style.display = "inline-block";
    document.getElementById("switchToRegisterButton").style.display = "inline-block";
    document.getElementById("completeRegisterButton").style.display = "none";
    document.getElementById("backToLoginButton").style.display = "none";
}
