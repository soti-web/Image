‘use strict’;

(function () {
const container = document.getElementById(‘globe-section’);
const canvas = document.getElementById(‘kurdistan-globe’);
if (!canvas || !container) return;

const W = container.offsetWidth || 300;
const H = container.offsetHeight || 300;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(W, H);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
camera.position.z = 2.5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const sunLight = new THREE.DirectionalLight(0xfff5e0, 1.5);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);
const backLight = new THREE.DirectionalLight(0x4488ff, 0.2);
backLight.position.set(-5, -2, -3);
scene.add(backLight);

// ===================================
// Draw Earth texture on canvas
// ===================================
const texSize = 2048;
const earthCanvas = document.createElement(‘canvas’);
earthCanvas.width = texSize;
earthCanvas.height = texSize / 2;
const ec = earthCanvas.getContext(‘2d’);

// Ocean background
const oceanGrad = ec.createLinearGradient(0, 0, 0, texSize / 2);
oceanGrad.addColorStop(0, ‘#0a1628’);
oceanGrad.addColorStop(0.3, ‘#0d2240’);
oceanGrad.addColorStop(0.7, ‘#0d2240’);
oceanGrad.addColorStop(1, ‘#0a1628’);
ec.fillStyle = oceanGrad;
ec.fillRect(0, 0, texSize, texSize / 2);

function latLonToXY(lat, lon) {
const x = ((lon + 180) / 360) * texSize;
const y = ((90 - lat) / 180) * (texSize / 2);
return [x, y];
}

function drawLand(coords, color, borderColor) {
ec.beginPath();
let first = true;
for (const [lat, lon] of coords) {
const [x, y] = latLonToXY(lat, lon);
if (first) { ec.moveTo(x, y); first = false; }
else ec.lineTo(x, y);
}
ec.closePath();
ec.fillStyle = color;
ec.fill();
if (borderColor) {
ec.strokeStyle = borderColor;
ec.lineWidth = 1.5;
ec.stroke();
}
}

const landColor = ‘#1a3a1a’;
const landBorder = ‘#2a5a2a’;

// Europe
drawLand([
[71,28],[70,20],[65,14],[60,5],[58,5],[55,8],[54,10],[52,4],[51,2],[48,2],[46,6],[44,8],[43,16],[45,20],[47,22],[48,18],[50,15],[52,14],[54,18],[56,21],[59,24],[62,25],[65,28],[68,30],[71,28]
], landColor, landBorder);

// Africa
drawLand([
[37,10],[35,12],[30,32],[20,38],[10,42],[0,42],[-10,38],[-20,35],[-30,30],[-34,26],[-34,18],[-28,17],[-20,14],[-10,13],[0,9],[5,2],[4,-8],[5,-5],[10,5],[15,2],[20,3],[25,12],[30,32],[37,10]
], landColor, landBorder);

// Asia
drawLand([
[70,30],[68,40],[65,50],[62,60],[60,70],[55,80],[50,87],[45,85],[40,75],[35,70],[30,65],[25,57],[20,58],[15,44],[12,44],[10,42],[20,38],[30,32],[35,36],[38,36],[40,36],[42,40],[44,42],[46,40],[48,46],[50,50],[52,58],[55,65],[60,73],[62,78],[65,80],[68,78],[70,72],[72,68],[73,62],[70,55],[68,50],[70,42],[70,30]
], landColor, landBorder);

// North America
drawLand([
[70,-140],[68,-135],[65,-130],[60,-135],[55,-130],[50,-125],[45,-124],[40,-124],[35,-121],[30,-117],[25,-110],[20,-105],[15,-92],[10,-85],[8,-77],[10,-75],[15,-83],[20,-87],[25,-90],[30,-88],[35,-76],[40,-74],[45,-64],[50,-55],[55,-60],[60,-65],[65,-70],[70,-80],[73,-85],[75,-95],[73,-110],[70,-120],[70,-140]
], landColor, landBorder);

// South America
drawLand([
[10,-75],[5,-77],[0,-78],[-5,-80],[-10,-75],[-15,-75],[-20,-70],[-25,-65],[-30,-65],[-35,-60],[-40,-63],[-45,-65],[-50,-68],[-55,-65],[-55,-67],[-50,-70],[-45,-72],[-40,-70],[-35,-58],[-30,-50],[-25,-48],[-20,-40],[-15,-38],[-10,-37],[-5,-35],[0,-50],[5,-52],[8,-60],[10,-62],[10,-75]
], landColor, landBorder);

// Australia
drawLand([
[-15,130],[-12,136],[-15,140],[-20,148],[-25,153],[-30,153],[-35,150],[-38,146],[-38,140],[-35,136],[-32,134],[-30,115],[-25,113],[-20,116],[-15,125],[-15,130]
], landColor, landBorder);

// Kurdistan - highlighted
const kurdistanCoords = [
[37.1, 38.8], [37.5, 40.0], [37.8, 41.5], [37.3, 43.0],
[37.2, 44.8], [36.8, 45.5], [36.2, 46.2], [35.5, 45.8],
[35.2, 45.2], [34.8, 44.5], [34.5, 43.8], [34.8, 43.0],
[35.0, 42.0], [35.5, 41.0], [36.0, 40.0], [36.5, 39.0],
];

// Kurdistan glow effect
ec.shadowColor = ‘rgba(255, 200, 0, 0.8)’;
ec.shadowBlur = 20;
drawLand(kurdistanCoords, ‘rgba(255, 180, 0, 0.85)’, ‘rgba(255, 220, 50, 1)’);
ec.shadowBlur = 0;

// Kurdistan label
const [kx, ky] = latLonToXY(36.2, 43.5);
ec.font = ‘bold 18px Arial’;
ec.fillStyle = ‘rgba(255, 240, 150, 1)’;
ec.textAlign = ‘center’;
ec.fillText(‘Kurdistan’, kx, ky);

// Grid lines
ec.strokeStyle = ‘rgba(100, 150, 255, 0.08)’;
ec.lineWidth = 0.5;
for (let lat = -80; lat <= 80; lat += 20) {
ec.beginPath();
const [, y] = latLonToXY(lat, -180);
ec.moveTo(0, y);
ec.lineTo(texSize, y);
ec.stroke();
}
for (let lon = -180; lon <= 180; lon += 20) {
ec.beginPath();
const [x] = latLonToXY(0, lon);
ec.moveTo(x, 0);
ec.lineTo(x, texSize / 2);
ec.stroke();
}

const earthTex = new THREE.CanvasTexture(earthCanvas);

// Earth sphere
const earthGeo = new THREE.SphereGeometry(1, 64, 64);
const earthMat = new THREE.MeshPhongMaterial({
map: earthTex,
specular: new THREE.Color(0x222244),
shininess: 20,
});
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);

// Atmosphere
const atmosGeo = new THREE.SphereGeometry(1.03, 64, 64);
const atmosMat = new THREE.MeshPhongMaterial({
color: 0x4488ff,
transparent: true,
opacity: 0.07,
side: THREE.FrontSide,
});
scene.add(new THREE.Mesh(atmosGeo, atmosMat));

// Location pin
function latLonToVec3(lat, lon, r) {
const phi = (90 - lat) * Math.PI / 180;
const theta = (lon + 180) * Math.PI / 180;
return new THREE.Vector3(
-r * Math.sin(phi) * Math.cos(theta),
r * Math.cos(phi),
r * Math.sin(phi) * Math.sin(theta)
);
}

const pinGeo = new THREE.SphereGeometry(0.025, 16, 16);
const pinMat = new THREE.MeshBasicMaterial({ color: 0xff2200 });
const pin = new THREE.Mesh(pinGeo, pinMat);
scene.add(pin);

const glowGeo = new THREE.SphereGeometry(0.045, 16, 16);
const glowMat = new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.35 });
const glow = new THREE.Mesh(glowGeo, glowMat);
scene.add(glow);

// Center on Kurdistan
earth.rotation.y = -(44 + 180) * Math.PI / 180;

// Controls
let isDragging = false;
let prevX = 0, prevY = 0;
let autoSpin = true;

canvas.addEventListener(‘mousedown’, e => { isDragging = true; autoSpin = false; prevX = e.clientX; prevY = e.clientY; });
window.addEventListener(‘mousemove’, e => {
if (!isDragging) return;
earth.rotation.y += (e.clientX - prevX) * 0.005;
earth.rotation.x += (e.clientY - prevY) * 0.005;
prevX = e.clientX; prevY = e.clientY;
});
window.addEventListener(‘mouseup’, () => { isDragging = false; setTimeout(() => autoSpin = true, 2000); });

canvas.addEventListener(‘touchstart’, e => { isDragging = true; autoSpin = false; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; e.preventDefault(); }, { passive: false });
canvas.addEventListener(‘touchmove’, e => {
if (!isDragging) return;
earth.rotation.y += (e.touches[0].clientX - prevX) * 0.005;
earth.rotation.x += (e.touches[0].clientY - prevY) * 0.005;
prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
e.preventDefault();
}, { passive: false });
canvas.addEventListener(‘touchend’, () => { isDragging = false; setTimeout(() => autoSpin = true, 2000); });

let pulseDir = 1, pulseScale = 1;

function animate() {
requestAnimationFrame(animate);
if (autoSpin && !isDragging) earth.rotation.y += 0.003;

```
pulseScale += 0.02 * pulseDir;
if (pulseScale > 1.6 || pulseScale < 0.8) pulseDir *= -1;
glow.scale.setScalar(pulseScale);

const pinPos = latLonToVec3(36.5, 44.0, 1.05);
pinPos.applyEuler(earth.rotation);
pin.position.copy(pinPos);
glow.position.copy(pinPos);

renderer.render(scene, camera);
```

}

animate();

window.addEventListener(‘resize’, () => {
const w = container.offsetWidth;
const h = container.offsetHeight;
camera.aspect = w / h;
camera.updateProjectionMatrix();
renderer.setSize(w, h);
});

})();