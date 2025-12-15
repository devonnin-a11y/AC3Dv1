
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3ff);

const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, .7));
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(5,10,5);
scene.add(sun);

const groundMat = new THREE.MeshStandardMaterial({ color: 0x7ec850 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(40,40), groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

const sim = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.35, 1.1, 4, 8),
  new THREE.MeshStandardMaterial({ color: 0xffcc99 })
);
sim.position.y = 1;
scene.add(sim);

window.addEventListener("resize", () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

window.THREEWORLD = { scene, camera, renderer, sim, groundMat };
