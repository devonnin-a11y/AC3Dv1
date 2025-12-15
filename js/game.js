
window.__gameRunning = false;

window.startGameLoop = () => {
  if(window.__gameRunning) return;
  window.__gameRunning = true;

  function loop(){
    const s = state.sim, i = window.input;
    let moving = false;

    if(i.up){ s.pos.z -= s.speed; moving = true; }
    if(i.down){ s.pos.z += s.speed; moving = true; }
    if(i.left){ s.pos.x -= s.speed; moving = true; }
    if(i.right){ s.pos.x += s.speed; moving = true; }

    setAnim(moving ? "walk" : "idle");

    THREEWORLD.sim.position.set(s.pos.x, 1, s.pos.z);
    THREEWORLD.camera.position.set(s.pos.x, 8, s.pos.z + 10);
    THREEWORLD.camera.lookAt(THREEWORLD.sim.position);

    updateNPCs?.();
    updateInvasions?.();

    // needs tick (simple stable)
    s.needs.hunger = Math.max(0, s.needs.hunger - 0.002);
    s.needs.energy = Math.max(0, s.needs.energy - 0.0015);
    s.needs.social = Math.max(0, s.needs.social - 0.001);

    document.getElementById("player-level").textContent = "Lv " + s.level;
    document.getElementById("need-hunger").textContent = Math.round(s.needs.hunger);
    document.getElementById("need-energy").textContent = Math.round(s.needs.energy);
    document.getElementById("need-social").textContent = Math.round(s.needs.social);

    THREEWORLD.renderer.render(THREEWORLD.scene, THREEWORLD.camera);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
};
