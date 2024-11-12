import { GooCursor } from './cursor.js';
import { TextAnimator } from './text-animator.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';
const cursorEl = document.querySelector('.cursor');
const goo = new GooCursor(cursorEl);
let scene, camera, renderer, sphere, mouseX = 0, mouseY = 0;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2, 32, 32);
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x151515,
  wireframe: true,
});

sphere = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(sphere);

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Function to handle scroll and change the sphere size and position
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollY / maxScroll;
  const scale = 1 + scrollFraction * 2;
  sphere.scale.set(scale, scale, scale);
});

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;
  sphere.rotation.x += mouseY * 0.005;
  sphere.rotation.y += mouseX * 0.005;
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

window.addEventListener('click', () => {
  gsap.
  timeline()
  .addLabel('start', 0)
  .to(goo.DOM.cells, {
    duration: 1,
    ease: 'power4',
    opacity: 1,
    stagger: {
      from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
      each: 0.02,
      grid: [goo.rows,goo.columns]
    }
  }, 'start')
  .to(goo.DOM.cells, {
    duration: 1,
    ease: 'power1',
    opacity: 0,
    stagger: {
      from: [...goo.DOM.cells].indexOf(goo.getCellAtCursor()),
      each: 0.03,
      grid: [goo.rows,goo.columns]
    }
  }, 'start+=0.3')
});

const init = () => {
  document.querySelectorAll('a.hover-effect').forEach(item => {
    const animator = new TextAnimator(item);
    item.addEventListener('mouseenter', () => {
      animator.animate();
    });
  });

  document.querySelectorAll('p.hover-effect').forEach(item => {
    const animator = new TextAnimator(item);
    item.addEventListener('mouseenter', () => {
      animator.shuffle_animate();
    });
  });

  document.querySelectorAll('h2.hover-effect').forEach(item => {
    const animator = new TextAnimator(item);
    item.addEventListener('mouseenter', () => {
      animator.test_animate();
    });
  });

  animate();
};

const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
init();