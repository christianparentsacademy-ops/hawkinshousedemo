import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

let scene, camera, renderer;
let raycaster, mouse;
let pillars = [];

const data = {
  parents: ["Christian Parents Academy", "Courses", "Books", "Events"],
  kids: ["Assessments", "Courses", "Books", "Discipleship Tools", "Events"],
  preteens: ["Assessments", "Courses", "Books", "Discipleship Tools", "Events"],
  teens: ["Assessments", "Courses", "Books", "Discipleship Tools", "Events"]
};

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // LIGHT
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,10,7);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // GROUND
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({ color: 0x88aa66 })
  );
  ground.rotation.x = -Math.PI/2;
  scene.add(ground);

  // HOUSE BODY
  const house = new THREE.Mesh(
    new THREE.BoxGeometry(4,2,3),
    new THREE.MeshStandardMaterial({ color: 0x3a4a5a })
  );
  house.position.y = 1;
  scene.add(house);

  // ROOF
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3,1.5,4),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  roof.position.y = 2.5;
  roof.rotation.y = Math.PI/4;
  scene.add(roof);

  // PILLARS
  createPillar(-1.5, "parents");
  createPillar(-0.5, "kids");
  createPillar(0.5, "preteens");
  createPillar(1.5, "teens");

  // DOOR
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.8,1.4,0.1),
    new THREE.MeshStandardMaterial({ color: 0x552200 })
  );
  door.position.set(0,0.7,1.51);
  door.name = "door";
  scene.add(door);

  window.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);
}

function createPillar(x, name) {
  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15,0.15,2),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  pillar.position.set(x,1,1.5);
  pillar.name = name;
  scene.add(pillar);
  pillars.push(pillar);
}

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const obj = intersects[0].object;

    if (data[obj.name]) {
      zoomTo(obj.position);
      showOverlay(obj.name);
    }

    if (obj.name === "door") {
      enterHouse();
    }
  }
}

function zoomTo(pos) {
  camera.position.set(pos.x, pos.y + 1, pos.z + 2);
}

function showOverlay(name) {
  const overlay = document.getElementById("overlay");
  const title = document.getElementById("pillarTitle");
  const list = document.getElementById("pillarList");

  title.innerText = name.toUpperCase();
  list.innerHTML = "";

  data[name].forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });

  overlay.classList.remove("hidden");
}

window.closeOverlay = function() {
  document.getElementById("overlay").classList.add("hidden");
};

function enterHouse() {
  camera.position.set(0, 1.5, 0);
  scene.background = new THREE.Color(0x333333);
}

window.resetView = function() {
  camera.position.set(0,2,6);
  scene.background = null;
};

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // subtle idle motion
  camera.position.x += Math.sin(Date.now()*0.0005) * 0.0005;

  renderer.render(scene, camera);
}
