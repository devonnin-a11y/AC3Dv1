
window.showOverlay = () => {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
};

window.closeAllPanels = () => {
  // Close every menu/panel consistently (fixes bug)
  const ids = ["phone","inventory","housing","shops","quests","saves"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    el.style.display = "none";
    el.setAttribute("aria-hidden", "true");
  });
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
};

window.togglePhone = () => {
  closeAllPanels();
  const el = document.getElementById("phone");
  el.style.display = "flex";
  el.setAttribute("aria-hidden", "false");
  showOverlay();
};

window.toggleInventory = () => {
  closeAllPanels();
  const p = document.getElementById("inventory");
  p.style.display = "block";
  p.innerHTML = `<b>Inventory</b><pre style="white-space:pre-wrap">${JSON.stringify(state.sim.inventory,null,2)}</pre>
  <button onclick="closeAllPanels()">Close</button>`;
  showOverlay();
};

window.toggleSaves = () => {
  closeAllPanels();
  const p = document.getElementById("saves");
  p.style.display = "block";
  p.innerHTML = `
    <b>Saves</b><br>
    <div class="muted small" style="margin-top:6px;">Save and load without leaving the game.</div>
    <hr>
    <button onclick="saveSlots.save(1)">Save Slot 1</button>
    <button onclick="saveSlots.save(2)">Save Slot 2</button>
    <button onclick="saveSlots.save(3)">Save Slot 3</button>
    <hr>
    <button onclick="saveSlots.load(1)">Load Slot 1</button>
    <button onclick="saveSlots.load(2)">Load Slot 2</button>
    <button onclick="saveSlots.load(3)">Load Slot 3</button>
    <hr>
    <button class="ghost" onclick="closeAllPanels()">Close</button>
  `;
  showOverlay();
};

// Simple cutscene: temporary overlay screen
window.playCutscene = (text) => {
  const scr = document.createElement("div");
  scr.className = "screen show";
  scr.style.zIndex = "2000";
  scr.innerHTML = `<div class="screen-card"><div class="logo">🎬</div><div style="margin-top:10px;font-weight:900;">${text}</div><div class="muted" style="margin-top:8px;">Tap to continue</div></div>`;
  scr.addEventListener("click", () => scr.remove(), { once:true });
  document.body.appendChild(scr);
};
