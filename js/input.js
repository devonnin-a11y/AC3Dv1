
const input = { up:false, down:false, left:false, right:false };

const keyMap = {
  ArrowUp: "up", KeyW: "up",
  ArrowDown: "down", KeyS: "down",
  ArrowLeft: "left", KeyA: "left",
  ArrowRight: "right", KeyD: "right"
};

window.addEventListener("keydown", (e) => {
  if(keyMap[e.code]) input[keyMap[e.code]] = true;
  if(e.code === "Escape") window.closeAllPanels?.();
});

window.addEventListener("keyup", (e) => {
  if(keyMap[e.code]) input[keyMap[e.code]] = false;
});

// Mobile D-Pad press & hold
function bindPad(){
  document.querySelectorAll("#dpad button").forEach((b) => {
    const d = b.dataset.dir;
    b.addEventListener("pointerdown", () => input[d] = true);
    b.addEventListener("pointerup", () => input[d] = false);
    b.addEventListener("pointerleave", () => input[d] = false);
    b.addEventListener("pointercancel", () => input[d] = false);
  });
}
window.bindPad = bindPad;
window.input = input;
