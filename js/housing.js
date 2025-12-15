
window.toggleHousing = () => {
  closeAllPanels();
  const p = document.getElementById("housing");
  p.style.display = "block";
  p.innerHTML = `
    <b>House</b><br>
    Status: <b>${state.sim.house.inside ? "Inside" : "Outside"}</b><br><br>
    <button onclick="enterHouse()">Enter Interior</button>
    <button onclick="exitHouse()">Exit to Village</button>
    <hr>
    <b>Decorate</b><br>
    <button onclick="placeFurniture('chair')">Place Chair</button>
    <button onclick="placeFurniture('table')">Place Table</button>
    <div class="muted small" style="margin-top:8px;">Furniture spawns near you (placeholder). Later you can add snapping + rotation.</div>
  `;
  showOverlay();
};

window.enterHouse = () => {
  state.sim.house.inside = true;
  document.getElementById("area").textContent = "🏠 Interior";
  // swap ground color to imply interior, stable & cheap
  if(THREEWORLD?.groundMat) THREEWORLD.groundMat.color.setHex(0xd7ccc8);
};

window.exitHouse = () => {
  state.sim.house.inside = false;
  document.getElementById("area").textContent = "🏘 Village";
  if(THREEWORLD?.groundMat) THREEWORLD.groundMat.color.setHex(0x7ec850);
};

window.placeFurniture = (type) => {
  const color = type === "table" ? 0x6d4c41 : 0x8d6e63;
  const f = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.4, 0.6),
    new THREE.MeshStandardMaterial({ color })
  );
  f.position.set(state.sim.pos.x + 1, 0.2, state.sim.pos.z);
  THREEWORLD.scene.add(f);
  state.sim.house.furniture.push({ type, x: f.position.x, z: f.position.z });
};
