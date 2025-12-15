
window.questState = window.questState || { step: 0 };

const story = [
  { title: "Meet the Elder", text: "Find Eda in the village and say hello.", complete: () => true },
  { title: "Defend the Village", text: "Survive an invasion wave.", complete: () => state.world.enemies.length === 0 && state.world.invasionTimer < 60 },
  { title: "Settle In", text: "Enter your house interior.", complete: () => state.sim.house.inside === true },
];

window.toggleQuests = () => {
  closeAllPanels();
  const p = document.getElementById("quests");
  p.style.display = "block";
  const step = questState.step ?? 0;
  const q = story[Math.min(step, story.length-1)];
  p.innerHTML = `
    <b>Story Quest</b><br><br>
    <div><b>${q.title}</b></div>
    <div class="muted" style="margin-top:6px;">${q.text}</div>
    <br>
    <button onclick="tryAdvanceQuest()">Check Progress</button>
    <div class="muted small" style="margin-top:8px;">Cutscenes are safe placeholders (fade + text). Expand later.</div>
  `;
  showOverlay();
};

window.tryAdvanceQuest = () => {
  const step = questState.step ?? 0;
  const q = story[Math.min(step, story.length-1)];
  if(q.complete()){
    questState.step = Math.min(step + 1, story.length-1);
    // simple cutscene: quick overlay message
    window.playCutscene?.(`${q.title} — Complete!`);
  }
  toggleQuests();
};
