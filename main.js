// main.js
import { loadCharacterHandler, showRegisterForm, showLoginForm, registerCharacterHandler } from './auth.js';
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

        // Update local gameState
        gameState.currentUser = user;
        gameState.character = characterData;

        // Handle UI changes (panel visibility) - IMPORTANT: Show gameContainer BEFORE initMap
        if (loginPanel) loginPanel.style.display = 'none';
        if (gameContainer) gameContainer.style.display = 'block';
        if (authErrorElement) authErrorElement.textContent = ''; // Clear any previous errors
        
        // Explicitly show the main UI panel and default character tab
        const unifiedUIPanel = document.querySelector('.unified-ui-panel');
        if (unifiedUIPanel) unifiedUIPanel.style.display = 'block';
        const characterTab = document.getElementById('characterTabContent');
        if (characterTab) characterTab.style.display = 'block';
        // Ensure other tabs are hidden if tab logic isn't automatically handling it on init
        const inventoryTab = document.getElementById('inventoryTabContent');
        if (inventoryTab) inventoryTab.style.display = 'none';
        const eventLogTab = document.getElementById('eventLogTabContent');
        if (eventLogTab) eventLogTab.style.display = 'none';
        const instructionsTab = document.getElementById('instructionsTabContent');
        if (instructionsTab) instructionsTab.style.display = 'none';
        const distanceTab = document.getElementById('distanceTabContent');
        if (distanceTab) distanceTab.style.display = 'none';
        const petsTab = document.getElementById('petsTabContent');
        if (petsTab) petsTab.style.display = 'none';


        // Call map and UI update functions AFTER game container is visible
        initMap(); // Initializes the map, instance managed by map.js
        updateCharacterStatsUI(gameState.character); // Pass characterData to map.js

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

  const completeRegisterButton = document.getElementById('completeRegisterButton');
  if (completeRegisterButton) {
    completeRegisterButton.addEventListener('click', async () => {
      try {
        const { user, characterData } = await registerCharacterHandler();

        // Update local gameState
        gameState.currentUser = user;
        gameState.character = characterData;

        // Update local gameState
        gameState.currentUser = user;
        gameState.character = characterData;

        // Handle UI changes - IMPORTANT: Show gameContainer BEFORE initMap
        if (loginPanel) loginPanel.style.display = 'none';
        if (gameContainer) gameContainer.style.display = 'block';
        if (authErrorElement) authErrorElement.textContent = '';
        
        // Explicitly show the main UI panel and default character tab
        const unifiedUIPanel = document.querySelector('.unified-ui-panel');
        if (unifiedUIPanel) unifiedUIPanel.style.display = 'block';
        const characterTab = document.getElementById('characterTabContent');
        if (characterTab) characterTab.style.display = 'block';
        // Ensure other tabs are hidden
        const inventoryTab = document.getElementById('inventoryTabContent');
        if (inventoryTab) inventoryTab.style.display = 'none';
        const eventLogTab = document.getElementById('eventLogTabContent');
        if (eventLogTab) eventLogTab.style.display = 'none';
        const instructionsTab = document.getElementById('instructionsTabContent');
        if (instructionsTab) instructionsTab.style.display = 'none';
        const distanceTab = document.getElementById('distanceTabContent');
        if (distanceTab) distanceTab.style.display = 'none';
        const petsTab = document.getElementById('petsTabContent');
        if (petsTab) petsTab.style.display = 'none';

        // Call map and UI update functions AFTER game container is visible
        initMap();
        updateCharacterStatsUI(gameState.character);

      } catch (error) {
        console.error("Registration process failed in main.js:", error);
        // Ensure gameContainer is not shown if registration fails
        if (gameContainer) gameContainer.style.display = 'none';
        // Ensure the registration form part of the loginPanel remains visible
        // showRegisterForm() in auth.js already handles visibility of registration fields.
        // We just need to ensure loginPanel itself is visible.
        if (loginPanel) loginPanel.style.display = 'block';
        // authErrorElement is already set by registerCharacterHandler
      }
    });
  }
});
