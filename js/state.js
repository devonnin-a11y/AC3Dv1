
window.state = {
  sim: {
    pos: { x: 0, z: 0 },
    speed: 0.12,
    level: 1,
    animation: "idle",
    needs: { hunger: 80, energy: 80, social: 60 },
    inventory: { coins: 50 },
    house: { inside: false, furniture: [] }
  },
  world: {
    npcs: [],
    enemies: [],
    invasionTimer: 0
  }
};
