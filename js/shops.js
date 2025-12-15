
window.toggleShops = () => {
  closeAllPanels();
  const p = document.getElementById("shops");
  p.style.display = "block";
  const coins = state.sim.inventory.coins ?? 0;
  p.innerHTML = `
    <b>Village Shop</b><br>
    Coins: <b>${coins}</b><br><br>
    <button onclick="buy('potion', 10)">Buy Potion (10)</button>
    <button onclick="buy('chair', 25)">Buy Chair (25)</button>
    <button onclick="sellJunk()">Sell Junk (+5)</button>
    <div class="muted small" style="margin-top:10px;">Shops are time-safe (no async). Later: hours + NPC schedule tie-in.</div>
  `;
  showOverlay();
};

window.buy = (item, cost) => {
  const coins = state.sim.inventory.coins ?? 0;
  if(coins < cost) return;
  state.sim.inventory.coins = coins - cost;
  state.sim.inventory[item] = (state.sim.inventory[item] ?? 0) + 1;
  toggleShops(); // re-render
};

window.sellJunk = () => {
  state.sim.inventory.coins = (state.sim.inventory.coins ?? 0) + 5;
  toggleShops();
};
