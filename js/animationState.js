
/**
 * Placeholder animation state machine.
 * Later: replace internals with THREE.AnimationMixer actions.
 */
window.setAnim = (name) => {
  if(!name) return;
  window.state.sim.animation = name;
};
