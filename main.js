// main.js
import { loadCharacterHandler, showRegisterForm, showLoginForm } from './auth.js';

// Bind handlers to buttons once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', loadCharacterHandler);
    document.getElementById('switchToRegisterButton').addEventListener('click', showRegisterForm);
    document.getElementById('backToLoginButton').addEventListener('click', showLoginForm);

    // If needed, bind other UI events here
});
