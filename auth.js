// auth.js
import { auth, signInWithEmailAndPassword, firebase } from './firebase.js';
// Removed: import { initMap, updateCharacterStatsUI } from './map.js'; - these will be called by main.js

export async function loadCharacterHandler() {
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const authErrorElement = document.getElementById('authError');

    // Clear previous errors
    if (authErrorElement) authErrorElement.textContent = "";

    try {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email || !password) {
            if (authErrorElement) authErrorElement.textContent = "Email and password are required.";
            throw new Error("Email and password are required.");
        }

        // This function (signInWithEmailAndPassword) from Firebase already sets auth.currentUser internally upon success.
        await signInWithEmailAndPassword(auth, email, password);
        
        // Firebase's auth object is the source of truth for the current user.
        const user = auth.currentUser;

        if (user) {
            const characterData = await firebase.loadCharacter(); // loadCharacter uses auth.currentUser internally
            if (characterData) {
                // Return user and characterData for main.js to handle
                return { user, characterData };
            } else {
                if (authErrorElement) authErrorElement.textContent = "No character found for this user. Please register if you're new.";
                // We successfully logged in, but found no character.
                // This might be a valid state (e.g., user exists but needs to create a character),
                // or an error depending on application logic. For now, treat as recoverable error.
                throw new Error("No character found. Please register.");
            }
        } else {
            // This case should ideally not be reached if signInWithEmailAndPassword throws an error for invalid credentials,
            // or if it resolves successfully (which means auth.currentUser should be set).
            // However, as a safeguard:
            if (authErrorElement) authErrorElement.textContent = "Login failed, user not found after sign-in attempt. Please try again.";
            throw new Error("Login failed, user not found after sign-in attempt.");
        }
    } catch (err) {
        console.error("Load Character Handler Error:", err); // Log the full error for debugging
        // Display a user-friendly message. err.message from Firebase can be quite specific.
        if (authErrorElement) {
            if (err.code) { // Firebase errors often have a code
                switch (err.code) {
                    case 'auth/invalid-credential':
                    case 'auth/user-not-found': // Though 'invalid-credential' is now more common for both
                    case 'auth/wrong-password': // Also covered by 'invalid-credential'
                        authErrorElement.textContent = "Login failed: Invalid email or password. Please try again or register.";
                        break;
                    case 'auth/network-request-failed':
                        authErrorElement.textContent = "Login failed: Network error. Please check your connection.";
                        break;
                    default:
                        authErrorElement.textContent = "Login failed: " + err.message;
                }
            } else {
                authErrorElement.textContent = "Login failed: " + err.message;
            }
        }
        // Re-throw the error so the caller (main.js) knows the operation failed.
        // Or, return a specific error structure e.g., { error: err }
        throw err; 
    }
}

export function showRegisterForm() {
    // This function continues to handle its specific DOM changes for now.
    // Ideally, this would be part of a dedicated UI module or managed by main.js.
    document.getElementById("registrationFields").style.display = "block";
    document.getElementById("loginSpecificFields").style.display = "none";
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("switchToRegisterButton").style.display = "none";
    document.getElementById("completeRegisterButton").style.display = "inline-block";
    document.getElementById("backToLoginButton").style.display = "inline-block";
    const authErrorElement = document.getElementById('authError');
    if (authErrorElement) authErrorElement.textContent = ""; // Clear errors when switching forms
}

export function showLoginForm() {
    // This function continues to handle its specific DOM changes for now.
    document.getElementById("registrationFields").style.display = "none";
    document.getElementById("loginSpecificFields").style.display = "block";
    document.getElementById("loginButton").style.display = "inline-block";
    document.getElementById("switchToRegisterButton").style.display = "inline-block";
    document.getElementById("completeRegisterButton").style.display = "none";
    document.getElementById("backToLoginButton").style.display = "none";
    const authErrorElement = document.getElementById('authError');
    if (authErrorElement) authErrorElement.textContent = ""; // Clear errors when switching forms
}
