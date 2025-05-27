// main.js
import { loadCharacterHandler, showRegisterForm, showLoginForm } from './auth.js';

window.gameState = {
  currentUser: null,
  character: null,
  map: null
};

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginButton').addEventListener('click', loadCharacterHandler);
  document.getElementById('switchToRegisterButton').addEventListener('click', showRegisterForm);
  document.getElementById('backToLoginButton').addEventListener('click', showLoginForm);
});
