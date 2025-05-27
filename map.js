// map.js
export function initMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Store the map in gameState
    window.gameState.map = map;
}

export function updateCharacterStatsUI() {
    const character = window.gameState.character;
    document.getElementById("characterName").textContent = character.name || "Adventurer";
    document.getElementById("speedStat").textContent = character.speed || 10;
    document.getElementById("combatStat").textContent = character.combat || 10;
    document.getElementById("magicStat").textContent = character.magic || 10;
    document.getElementById("luckStat").textContent = character.luck || 10;
    document.getElementById("strengthStat").textContent = character.strength || 0;
    document.getElementById("goldStat").textContent = character.gold || 50;
    document.getElementById("healthStat").textContent = character.health || 100;
    document.getElementById("maxHealthStat").textContent = character.maxHealth || 100;
}
