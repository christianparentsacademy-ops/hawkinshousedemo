const pathwayData = {
  parents: {
    title: "Parents",
    items: [
      "Christian Parents Academy",
      "Courses",
      "Books",
      "Events"
    ],
    zoom: "31% 58%",
    labelPosition: {
      left: "9%",
      top: "18%"
    }
  },
  kids: {
    title: "Kids",
    items: [
      "Assessments",
      "Courses",
      "Books",
      "Discipleship Tools",
      "Events"
    ],
    zoom: "42% 58%",
    labelPosition: {
      left: "17%",
      top: "18%"
    }
  },
  preteens: {
    title: "Preteens",
    items: [
      "Assessments",
      "Courses",
      "Books",
      "Discipleship Tools",
      "Events"
    ],
    zoom: "63% 58%",
    labelPosition: {
      left: "50%",
      top: "18%"
    }
  },
  teens: {
    title: "Teens",
    items: [
      "Assessments",
      "Courses",
      "Books",
      "Discipleship Tools",
      "Events"
    ],
    zoom: "74% 58%",
    labelPosition: {
      left: "58%",
      top: "18%"
    }
  }
};

const exteriorScene = document.getElementById("exteriorScene");
const interiorScene = document.getElementById("interiorScene");
const houseStage = document.getElementById("houseStage");
const infoPanel = document.getElementById("infoPanel");
const panelTitle = document.getElementById("panelTitle");
const panelList = document.getElementById("panelList");
const panelSubtitle = document.getElementById("panelSubtitle");
const closePanelBtn = document.getElementById("closePanelBtn");
const pillarLabels = document.getElementById("pillarLabels");
const pillarButtons = [...document.querySelectorAll(".pillar")];
const doorHotspot = document.getElementById("doorHotspot");
const homeBtn = document.getElementById("homeBtn");
const interiorBtn = document.getElementById("interiorBtn");
const backOutsideBtn = document.getElementById("backOutsideBtn");

let activePillar = null;

function openPillar(pillarKey) {
  const config = pathwayData[pillarKey];
  if (!config) return;

  activePillar = pillarKey;

  pillarButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.pillar === pillarKey);
  });

  houseStage.classList.add("zoomed");
  houseStage.style.transformOrigin = config.zoom;
  houseStage.style.transform = "scale(1.42)";

  panelTitle.textContent = config.title;
  panelSubtitle.textContent = "Click any available pathway below.";
  panelList.innerHTML = "";

  config.items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    panelList.appendChild(li);
  });

  infoPanel.classList.add("open");

  pillarLabels.innerHTML = `
    <h3>${config.title}</h3>
    <ul class="pillar-inline-list">
      ${config.items.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
  pillarLabels.style.left = config.labelPosition.left;
  pillarLabels.style.top = config.labelPosition.top;
  pillarLabels.classList.remove("hidden");

  requestAnimationFrame(() => {
    pillarLabels.classList.add("visible");
  });
}

function closePillar() {
  activePillar = null;
  pillarButtons.forEach(btn => btn.classList.remove("active"));
  infoPanel.classList.remove("open");
  houseStage.classList.remove("zoomed");
  houseStage.style.transformOrigin = "center center";
  houseStage.style.transform = "scale(1)";
  pillarLabels.classList.remove("visible");

  setTimeout(() => {
    pillarLabels.classList.add("hidden");
    pillarLabels.innerHTML = "";
  }, 220);
}

function showExterior() {
  interiorScene.classList.remove("active");
  exteriorScene.classList.add("active");
}

function showInterior() {
  closePillar();
  exteriorScene.classList.remove("active");
  interiorScene.classList.add("active");
}

pillarButtons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.pillar;
    if (activePillar === key) {
      closePillar();
      return;
    }
    showExterior();
    openPillar(key);
  });
});

doorHotspot.addEventListener("click", () => {
  showInterior();
});

closePanelBtn.addEventListener("click", closePillar);
homeBtn.addEventListener("click", () => {
  showExterior();
  closePillar();
});
interiorBtn.addEventListener("click", showInterior);
backOutsideBtn.addEventListener("click", () => {
  showExterior();
  closePillar();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (interiorScene.classList.contains("active")) {
      showExterior();
    }
    closePillar();
  }
});

window.addEventListener("resize", () => {
  if (!activePillar) return;
  const config = pathwayData[activePillar];
  if (!config) return;
  pillarLabels.style.left = config.labelPosition.left;
  pillarLabels.style.top = config.labelPosition.top;
});
