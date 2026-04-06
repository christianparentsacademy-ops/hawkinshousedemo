const data = {
  parents: [
    "Christian Parents Academy",
    "Courses",
    "Books",
    "Events"
  ],
  kids: [
    "Assessments",
    "Courses",
    "Books",
    "Discipleship Tools",
    "Events"
  ],
  preteens: [
    "Assessments",
    "Courses",
    "Books",
    "Discipleship Tools",
    "Events"
  ],
  teens: [
    "Assessments",
    "Courses",
    "Books",
    "Discipleship Tools",
    "Events"
  ]
};

const zoomMap = {
  parents: { scale: 1.28, x: 13, y: 3 },
  kids: { scale: 1.28, x: 4, y: 3 },
  preteens: { scale: 1.28, x: -4, y: 3 },
  teens: { scale: 1.28, x: -13, y: 3 }
};

const houseScene = document.getElementById("houseScene");
const kitchenScene = document.getElementById("kitchenScene");
const houseFrame = document.getElementById("houseFrame");
const panel = document.getElementById("panel");
const title = document.getElementById("title");
const list = document.getElementById("list");

const pillarButtons = [...document.querySelectorAll(".pillar")];
const door = document.getElementById("door");
const closePanelBtn = document.getElementById("closePanelBtn");
const houseViewBtn = document.getElementById("houseViewBtn");
const kitchenViewBtn = document.getElementById("kitchenViewBtn");
const backToHouseBtn = document.getElementById("backToHouseBtn");

let active = null;

function setTransform(scale = 1, x = 0, y = 0) {
  houseFrame.style.transform = `translate3d(${x}%, ${y}%, 0) scale(${scale})`;
}

function openPanel(name) {
  title.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  list.innerHTML = "";
  data[name].forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    list.appendChild(li);
  });
  panel.classList.add("open");
}

function closePanel() {
  panel.classList.remove("open");
}

function clearPillars() {
  pillarButtons.forEach(btn => btn.classList.remove("active"));
}

function openPillar(name) {
  active = name;
  clearPillars();

  const button = pillarButtons.find(btn => btn.dataset.name === name);
  if (button) button.classList.add("active");

  const z = zoomMap[name];
  houseFrame.classList.add("zoomed");
  setTransform(z.scale, z.x, z.y);
  openPanel(name);
}

function resetHouse() {
  active = null;
  clearPillars();
  houseFrame.classList.remove("zoomed");
  setTransform(1, 0, 0);
  closePanel();
}

function showHouse() {
  kitchenScene.classList.remove("active");
  houseScene.classList.add("active");
}

function showKitchen() {
  resetHouse();
  houseScene.classList.remove("active");
  kitchenScene.classList.add("active");
}

pillarButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    showHouse();

    if (active === name) {
      resetHouse();
      return;
    }

    openPillar(name);
  });
});

door.addEventListener("click", () => {
  showKitchen();
});

closePanelBtn.addEventListener("click", resetHouse);
houseViewBtn.addEventListener("click", () => {
  showHouse();
  resetHouse();
});
kitchenViewBtn.addEventListener("click", showKitchen);
backToHouseBtn.addEventListener("click", () => {
  showHouse();
  resetHouse();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (kitchenScene.classList.contains("active")) {
      showHouse();
    }
    resetHouse();
  }
});
