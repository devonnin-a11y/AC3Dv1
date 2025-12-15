
window.saveSlots = {
  key(slot){ return "islandsim_v15_slot_" + slot; },
  save(slot){
    localStorage.setItem(this.key(slot), JSON.stringify(window.state));
  },
  load(slot){
    const d = localStorage.getItem(this.key(slot));
    if(!d) return false;
    const parsed = JSON.parse(d);
    // keep object identity for modules that reference state
    Object.keys(window.state).forEach(k => delete window.state[k]);
    Object.assign(window.state, parsed);
    return true;
  },
  clear(slot){
    localStorage.removeItem(this.key(slot));
  }
};
