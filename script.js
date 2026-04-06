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

const house = document.getElementById("house");
const panel = document.getElementById("panel");
const title = document.getElementById("title");
const list = document.getElementById("list");

// PILLAR CLICK
document.querySelectorAll(".pillar").forEach(pillar => {
  pillar.addEventListener("click", () => {
    const name = pillar.dataset.name;

    // zoom effect
    house.style.transform = "scale(1.4)";

    // show content
    title.innerText = name.toUpperCase();
    list.innerHTML = "";

    data[name].forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
    });

    panel.classList.remove("hidden");
  });
});

// DOOR CLICK
document.getElementById("door").addEventListener("click", () => {
  house.style.transform = "scale(2)";
  setTimeout(() => {
    alert("Entering the Kitchen Table (next version will animate this)");
  }, 400);
});

// CLOSE
function closePanel() {
  panel.classList.add("hidden");
  house.style.transform = "scale(1)";
}
