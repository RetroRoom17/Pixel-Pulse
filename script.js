const games = [
  { title: "Minecraft", background: "minecraft.jpg", slogan: "Build, explore, survive—your adventure awaits!" },
  { title: "Halo 3", background: "./wallpapers/halo3.jpg", slogan: "Finish the Fight" },
  { title: "DOOM", background: "DOOM.jpg", slogan: "Rip & Tear, until it is done." },
  { title: "Skyrim", background: "skyrim.jpg", slogan: "You are... Dragonborn!" },
  { title: "The Elder Scrolls IV", background: "elderscrollsoblivionremaster.jpg", slogan: "Close shut the Jaws... of Oblivion." },
  { title: "Tron Evolution", background: "tronevolution.jpg", slogan: "Welcome to The Grid, Program." },
  { title: "Devil May Cry 5", background: "dmc5.jpg", slogan: "I Am The Storm That Is Approaching" },
  { title: "DOOM 2016", background: "DOOM2016.jpg", slogan: "Fight Like Hell" },
  { title: "Halo: Combat Evolved", background: "haloce.jpg", slogan: "Combat has Evolved." }
];

function getGame() {
  const mode = localStorage.getItem("gameMode") || "daily";

  if (mode === "random") {
    return games[Math.floor(Math.random() * games.length)];
  } else {
    const dayOfYear = new Date().getFullYear() * 366 + new Date().getDate();
    const randomIndex = dayOfYear % games.length;
    return games[randomIndex];
  }
}

function setGameOfTheDay() {
  const game = getGame();
  document.getElementById("date").textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  document.getElementById("game-title").textContent = `Game of the Day: ${game.title}`;
  document.getElementById("slogan").textContent = game.slogan;
  document.body.style.backgroundImage = `url('${game.background}')`;
}

function saveSearchEngine() {
  const searchEngine = document.getElementById("search-engine").value;
  localStorage.setItem("preferredSearchEngine", searchEngine);
}

function loadSearchEngine() {
  const savedEngine = localStorage.getItem("preferredSearchEngine");
  if (savedEngine) {
    document.getElementById("search-engine").value = savedEngine;
  }
}

function performSearch(event) {
  if (event.key === "Enter") {
    const searchEngine = document.getElementById("search-engine").value;
    const query = document.getElementById("search-box").value.trim();
    if (query) {
      window.open(searchEngine + encodeURIComponent(query), "_blank");
    }
  }
}

function toggleGameMode() {
  const currentMode = localStorage.getItem("gameMode") || "daily";
  const newMode = currentMode === "daily" ? "random" : "daily";

  localStorage.setItem("gameMode", newMode);
  document.getElementById("toggle-mode-footer").textContent =
    newMode === "daily" ? "Switch to Random Mode" : "Switch to Daily Mode";

  setGameOfTheDay();
}

document.getElementById("search-engine").addEventListener("change", saveSearchEngine);
document.getElementById("search-box").addEventListener("keydown", performSearch);
document.getElementById("toggle-mode-footer").addEventListener("click", toggleGameMode);

window.onload = function () {
  setGameOfTheDay();
  loadSearchEngine();
  document.getElementById("toggle-mode-footer").textContent =
    (localStorage.getItem("gameMode") || "daily") === "daily" ? "Switch to Random Mode" : "Switch to Daily Mode";
};
