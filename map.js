// map.js

let mapInstance = null; // Module-scoped variable to hold the map instance

export function initMap() {
    // Ensure Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error("Leaflet library (L) is not loaded. Cannot initialize map.");
        return;
    }

    // Prevent re-initialization if map already exists
    if (mapInstance) {
        console.warn("Map already initialized.");
        return mapInstance; // Or simply return if no action needed
    }
    
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error("Map container element with ID 'map' not found.");
        return;
    }

    mapInstance = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    // Removed: window.gameState.map = map;
    // The mapInstance is now managed locally within this module.
    // If main.js or other modules need to interact with the map, 
    // dedicated functions should be exported from map.js, e.g.:
    // export function addMarkerToMap(latLng, options) { ... }
}

export function updateCharacterStatsUI(character) { // Accepts characterData as a parameter
    if (!character) {
        console.warn("No character data provided to updateCharacterStatsUI.");
        // Optionally, clear stats or show default values like "--"
        // For now, just return to prevent errors if elements might not exist or character is null
        return;
    }

    // Helper to safely set text content
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found for stats update.`);
        }
    };

    setText("characterName", character.name || "Adventurer");
    setText("speedStat", character.speed || 10);
    setText("combatStat", character.combat || 10);
    setText("magicStat", character.magic || 10);
    setText("luckStat", character.luck || 10);
    setText("strengthStat", character.strength || 0);
    setText("goldStat", character.gold || 50);
    setText("healthStat", character.health || 100);
    setText("maxHealthStat", character.maxHealth || 100);
}
