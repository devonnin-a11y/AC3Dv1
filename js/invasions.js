
function spawnEnemy(){
  const e = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xaa3333 })
  );
  e.position.set((Math.random()*10-5), 0.6, (Math.random()*10-5));
  e.userData = { hp: 30 };
  THREEWORLD.scene.add(e);
  state.world.enemies.push(e);
}

window.updateInvasions = () => {
  state.world.invasionTimer++;
  // Stable invasion: every ~12 seconds at 60fps (720 frames)
  const interval = 720;
  if(state.world.invasionTimer % interval === 0){
    // spawn 1-3 based on level
    const count = Math.min(3, 1 + Math.floor((state.sim.level-1)/2));
    for(let i=0;i<count;i++) spawnEnemy();
    window.playCutscene?.("⚠️ Invasion! Defend the village!");
  }
};
