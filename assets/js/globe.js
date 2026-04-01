‘use strict’;

(function () {
const container = document.getElementById(‘globe-section’);
const canvas = document.getElementById(‘kurdistan-globe’);
if (!canvas || !container) return;

const W = container.offsetWidth || 300;
const H = container.offsetHeight || 300;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(W, H);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

// Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
camera.position.z = 2.5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

const backLight = new THREE.DirectionalLight(0x4488ff, 0.3);
backLight.position.set(-5, -2, -3);
scene.add(backLight);

// Texture Loader
const loader = new THREE.TextureLoader();

// Earth
const earthGeo = new THREE.SphereGeometry(1, 64, 64);
const earthMat = new THREE.MeshPhongMaterial({
  map: loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
  specular: new THREE.Color(0x333333),
  shininess: 15,
});
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);


// Atmosphere glow
const atmosGeo = new THREE.SphereGeometry(1.02, 64, 64);
const atmosMat = new THREE.MeshPhongMaterial({
color: 0x4488ff,
transparent: true,
opacity: 0.08,
side: THREE.FrontSide,
});
const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
scene.add(atmosphere);

// Kurdistan highlight overlay
// Kurdistan center: lat 36.5, lon 44.0
function latLonToVec3(lat, lon, radius) {
const phi = (90 - lat) * Math.PI / 180;
const theta = (lon + 180) * Math.PI / 180;
return new THREE.Vector3(
-radius * Math.sin(phi) * Math.cos(theta),
radius * Math.cos(phi),
radius * Math.sin(phi) * Math.sin(theta)
);
}

// Kurdistan glow sphere (small patch)
const kurdGeo = new THREE.SphereGeometry(1.005, 64, 64);

// Create canvas texture for Kurdistan
const texSize = 1024;
const kTexCanvas = document.createElement(‘canvas’);
kTexCanvas.width = texSize;
kTexCanvas.height = texSize;
const kCtx = kTexCanvas.getContext(‘2d’);

// Kurdistan polygon in lat/lon
const kurdistanPoly = [
[37.1, 38.8], [37.5, 40.0], [37.2, 41.5], [37.3, 43.0],
[37.2, 44.8], [36.8, 45.5], [36.2, 46.2], [35.5, 45.8],
[35.2, 45.2], [34.8, 44.5], [34.5, 43.8], [34.8, 43.0],
[35.0, 42.0], [35.5, 41.0], [36.0, 40.0], [36.5, 39.0],
];

function latLonToTexXY(lat, lon) {
const x = ((lon + 180) / 360) * texSize;
const y = ((90 - lat) / 180) * texSize;
return [x, y];
}

// Draw Kurdistan
kCtx.clearRect(0, 0, texSize, texSize);
kCtx.beginPath();
let first = true;
for (const [lat, lon] of kurdistanPoly) {
const [x, y] = latLonToTexXY(lat, lon);
if (first) { kCtx.moveTo(x, y); first = false; }
else kCtx.lineTo(x, y);
}
kCtx.closePath();
kCtx.fillStyle = ‘rgba(255, 180, 0, 0.75)’;
kCtx.fill();
kCtx.strokeStyle = ‘rgba(255, 220, 50, 0.95)’;
kCtx.lineWidth = 3;
kCtx.stroke();

const kTex = new THREE.CanvasTexture(kTexCanvas);
const kurdMat = new THREE.MeshBasicMaterial({
map: kTex,
transparent: true,
depthWrite: false,
});
const kurdMesh = new THREE.Mesh(kurdGeo, kurdMat);
scene.add(kurdMesh);

// Location Pin for Kurdistan
const pinGeo = new THREE.SphereGeometry(0.025, 16, 16);
const pinMat = new THREE.MeshBasicMaterial({ color: 0xff2200 });
const pin = new THREE.Mesh(pinGeo, pinMat);
const pinPos = latLonToVec3(36.5, 44.0, 1.04);
pin.position.copy(pinPos);
scene.add(pin);

// Pin glow
const glowGeo = new THREE.SphereGeometry(0.04, 16, 16);
const glowMat = new THREE.MeshBasicMaterial({
color: 0xff4400,
transparent: true,
opacity: 0.4,
});
const glow = new THREE.Mesh(glowGeo, glowMat);
glow.position.copy(pinPos);
scene.add(glow);

// Start position — center on Kurdistan
earth.rotation.y = -44 * Math.PI / 180;
kurdMesh.rotation.y = earth.rotation.y;
atmosphere.rotation.y = earth.rotation.y;

// Drag controls
let isDragging = false;
let prevX = 0, prevY = 0;
let autoSpin = true;
let velX = 0, velY = 0;

canvas.addEventListener(‘mousedown’, e => {
isDragging = true;
autoSpin = false;
prevX = e.clientX;
prevY = e.clientY;
});

window.addEventListener(‘mousemove’, e => {
if (!isDragging) return;
const dx = e.clientX - prevX;
const dy = e.clientY - prevY;
velX = dy * 0.005;
velY = dx * 0.005;
earth.rotation.x += velX;
earth.rotation.y += velY;
kurdMesh.rotation.x = earth.rotation.x;
kurdMesh.rotation.y = earth.rotation.y;
atmosphere.rotation.x = earth.rotation.x;
atmosphere.rotation.y = earth.rotation.y;
prevX = e.clientX;
prevY = e.clientY;
});

window.addEventListener(‘mouseup’, () => {
isDragging = false;
setTimeout(() => { autoSpin = true; velX = 0; velY = 0; }, 2000);
});

canvas.addEventListener(‘touchstart’, e => {
isDragging = true;
autoSpin = false;
prevX = e.touches[0].clientX;
prevY = e.touches[0].clientY;
e.preventDefault();
}, { passive: false });

canvas.addEventListener(‘touchmove’, e => {
if (!isDragging) return;
const dx = e.touches[0].clientX - prevX;
const dy = e.touches[0].clientY - prevY;
velX = dy * 0.005;
velY = dx * 0.005;
earth.rotation.x += velX;
earth.rotation.y += velY;
kurdMesh.rotation.x = earth.rotation.x;
kurdMesh.rotation.y = earth.rotation.y;
atmosphere.rotation.x = earth.rotation.x;
atmosphere.rotation.y = earth.rotation.y;
prevX = e.touches[0].clientX;
prevY = e.touches[0].clientY;
e.preventDefault();
}, { passive: false });

canvas.addEventListener(‘touchend’, () => {
isDragging = false;
setTimeout(() => { autoSpin = true; }, 2000);
});

// Pin pulse animation
let pulseScale = 1;
let pulseDir = 1;

// Animate
function animate() {
requestAnimationFrame(animate);

```
if (autoSpin && !isDragging) {
  earth.rotation.y += 0.003;
  kurdMesh.rotation.y += 0.003;
  atmosphere.rotation.y += 0.003;
}

// Pin pulse
pulseScale += 0.02 * pulseDir;
if (pulseScale > 1.5 || pulseScale < 0.8) pulseDir *= -1;
glow.scale.setScalar(pulseScale);

// Keep pin attached to earth rotation
const pinWorld = latLonToVec3(36.5, 44.0, 1.04);
pinWorld.applyEuler(earth.rotation);
pin.position.copy(pinWorld);
glow.position.copy(pinWorld);

renderer.render(scene, camera);
```

}

animate();

// Resize
window.addEventListener(‘resize’, () => {
const w = container.offsetWidth;
const h = container.offsetHeight;
camera.aspect = w / h;
camera.updateProjectionMatrix();
renderer.setSize(w, h);
});

})();
