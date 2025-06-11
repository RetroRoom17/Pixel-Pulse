const games = [
  { title: "Minecraft", background: "wallpapers/minecraft.jpg", slogan: "Build, explore, survive—your adventure awaits!" },
  { title: "Halo 3", background: "wallpapers/halo3.jpg", slogan: "Finish the Fight" },
  { title: "DOOM", background: "wallpapers/DOOM.jpg", slogan: "Fight Like Hell" },
  { title: "Skyrim", background: "wallpapers/skyrim.jpg", slogan: "You are... Dragonborn!" },
  { title: "The Elder Scrolls IV", background: "wallpapers/elderscrollsoblivionremaster.jpg", slogan: "Close shut the Jaws... of Oblivion." },
  { title: "Tron Evolution", background: "wallpapers/tronevolution.jpg", slogan: "Welcome to The Grid, Program." },
  { title: "Devil May Cry 5", background: "wallpapers/dmc5.jpg", slogan: "I Am The Storm That Is Approaching" },
  { title: "DOOM 2016", background: "wallpapers/DOOM2016.jpg", slogan: "Rip and Tear, until it is Done." },
  { title: "Portal 2", background: "wallpapers/portal2.jpg", slogan: "The Return of GlaDOS" },
  { title: "Half-Life", background: "wallpapers/halflife.jpg", slogan: "The Right Man in the Wrong Place Can Make All The Difference In The World" },
  { title: "Halo: Reach", background: "wallpapers/haloreach.jpg", slogan: "From the Beginning, You Know the End." },
  { title: "Star Wars: The Force Unleashed", background: "wallpapers/starwarstheforceunleashed.jpg", slogan: "He was meant to unite us. To help us rise from the shadows of the Empire." },
  { title: "Star Wars: Empire At War", background: "wallpapers/starwarsempireatwar.jpg", slogan: "The rebellion must succeed… or all hope is lost." },
  { title: "Destiny", background: "wallpapers/destiny.jpg", slogan: "Eyes Up, Guardian!" },
  { title: "Destiny 2", background: "wallpapers/destiny2.jpg", slogan: "Welcome to a World... Without Light." },
  { title: "Forza Horizon", background: "wallpapers/forzahorizon.jpg", slogan: "Leave Your Limits" },
  { title: "Cyberpunk 2077", background: "wallpapers/cyberpunk2077.jpg", slogan: "Wake Up Samurai, we have a city to burn." },
  { title: "Halo: Combat Evolved", background: "wallpapers/haloce.jpg", slogan: "Combat has Evolved." }
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
