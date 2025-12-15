
function show(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("show"));
  const el = document.getElementById(id);
  if(el) el.classList.add("show");
}
function showGameRoot(showIt){
  document.getElementById("game").style.display = showIt ? "block" : "none";
}

window.openLoadMenu = () => document.getElementById("load-menu").classList.add("show");
window.closeLoadMenu = () => document.getElementById("load-menu").classList.remove("show");

window.startNew = () => {
  show("gameLoad");
  document.getElementById("gameLoadMsg").textContent = "Creating a fresh save…";
  // small delay so it feels like assets are loading and avoids layout pop
  setTimeout(() => {
    // reset state
    window.state.sim.pos = {x:0,z:0};
    window.state.sim.level = 1;
    window.state.sim.needs = {hunger:80,energy:80,social:60};
    window.state.sim.inventory = {coins:50};
    window.state.sim.house = {inside:false, furniture:[]};
    window.state.world.npcs = [];
    window.state.world.enemies = [];
    window.state.world.invasionTimer = 0;

    bootWorld();
  }, 650);
};

window.startLoad = (slot) => {
  show("gameLoad");
  document.getElementById("gameLoadMsg").textContent = "Loading save slot " + slot + "…";
  setTimeout(() => {
    const ok = saveSlots.load(slot);
    if(!ok){
      document.getElementById("gameLoadMsg").textContent = "No save found. Starting new…";
      setTimeout(() => startNew(), 650);
      return;
    }
    bootWorld();
  }, 650);
};

function bootWorld(){
  // Make sure menus work even during load
  window.closeAllPanels?.();

  // Show game, bind controls, spawn NPCs
  showGameRoot(true);
  bindPad?.();
  spawnTownNPCs?.();

  // Enter game
  showGameRoot(true);
  document.getElementById("boot").classList.remove("show");
  document.getElementById("home").classList.remove("show");
  document.getElementById("gameLoad").classList.remove("show");

  // Start loop
  startGameLoop?.();
}

// Boot flow: initial loading screen → home
showGameRoot(false);
show("boot");

setTimeout(() => {
  show("home");
}, 800);
