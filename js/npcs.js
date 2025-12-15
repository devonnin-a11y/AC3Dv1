
function spawnNPC(name, x, z, role){
  const n = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1.2, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x88ccee })
  );
  n.position.set(x, 0.6, z);
  n.userData = {
    name, role,
    home: { x, z },
    // schedule anchors (simple safe loop)
    patrol: [
      { x: x, z: z },
      { x: x + 1.2, z: z },
      { x: x + 1.2, z: z + 1.0 },
      { x: x, z: z + 1.0 },
    ],
    patrolIdx: 0
  };
  THREEWORLD.scene.add(n);
  state.world.npcs.push(n);
}

window.spawnTownNPCs = () => {
  spawnNPC("Milo", 2, 2, "shop");
  spawnNPC("Eda", -2, 3, "quest");
};

window.updateNPCs = () => {
  const speed = 0.006;
  state.world.npcs.forEach(n => {
    const t = n.userData.patrol[n.userData.patrolIdx];
    const dx = t.x - n.position.x;
    const dz = t.z - n.position.z;
    const dist = Math.hypot(dx, dz);
    if(dist < 0.05){
      n.userData.patrolIdx = (n.userData.patrolIdx + 1) % n.userData.patrol.length;
      return;
    }
    n.position.x += (dx / dist) * speed;
    n.position.z += (dz / dist) * speed;
  });
};
