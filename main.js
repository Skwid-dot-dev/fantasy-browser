// main.js
import { loadCharacterHandler, showRegisterForm, showLoginForm } from './auth.js';
import { initMap, updateCharacterStatsUI } from './map.js';

// Initialize gameState as a local variable
const gameState = {
  currentUser: null,
  character: null,
  // map instance is no longer stored here; it's managed within map.js
};

window.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  const switchToRegisterButton = document.getElementById('switchToRegisterButton');
  const backToLoginButton = document.getElementById('backToLoginButton');
  
  const loginPanel = document.getElementById('loginPanel');
  const gameContainer = document.getElementById('gameContainer');
  const authErrorElement = document.getElementById('authError');

  if (loginButton) {
    loginButton.addEventListener('click', async () => {
      try {
        // auth.js's loadCharacterHandler now returns { user, characterData } or throws error
        const { user, characterData } = await loadCharacterHandler();

        // Update local gameState
        gameState.currentUser = user;
        gameState.character = characterData;

        // Call map and UI update functions
        initMap(); // Initializes the map, instance managed by map.js
        updateCharacterStatsUI(gameState.character); // Pass characterData to map.js

        // Handle UI changes (panel visibility)
        if (loginPanel) loginPanel.style.display = 'none';
        if (gameContainer) gameContainer.style.display = 'block';
        if (authErrorElement) authErrorElement.textContent = ''; // Clear any previous errors

      } catch (error) {
        // Error handling is now more centralized here for UI changes,
        // though auth.js still updates its specific authErrorElement.
        // If authErrorElement is updated by auth.js, no need to set it here unless overriding.
        console.error("Login process failed in main.js:", error);
        // Ensure gameContainer is not shown if login fails
        if (gameContainer) gameContainer.style.display = 'none';
        if (loginPanel) loginPanel.style.display = 'block'; // Ensure login panel is visible
      }
    });
  }

  if (switchToRegisterButton) {
    switchToRegisterButton.addEventListener('click', () => {
        showRegisterForm(); // auth.js function still handles its specific DOM changes for now
        // main.js could take over these UI changes for consistency if desired in future refactor
    });
  }

  if (backToLoginButton) {
    backToLoginButton.addEventListener('click', () => {
        showLoginForm(); // auth.js function still handles its specific DOM changes for now
    });
  }
});
