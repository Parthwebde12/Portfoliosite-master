// ── Particle canvas ──
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.a = Math.random() * 0.5 + 0.1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(56,189,248,${this.a})`;
    ctx.fill();
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(56,189,248,${(1 - d/100) * 0.12})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
}
animate();

// ── Typewriter ──
const phrases = [
  'Full Stack Developer',
  'React & TypeScript Engineer',
  'API Architecture Designer',
  'DevOps & Cloud Explorer',
  'Building in Public 🚀'
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const cur = phrases[pi];
  if (!deleting) {
    tw.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    tw.textContent = cur.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 80);
}
typeLoop();

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Skill bars ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const sb = document.getElementById('skill-bars');
if (sb) skillObserver.observe(sb);

// ── Counter animation ──
function animateCount(el, target, suffix = '') {
  let start = 0;
  const step = () => {
    start += Math.ceil(target / 40);
    if (start >= target) { el.textContent = target + suffix; return; }
    el.textContent = start + suffix;
    requestAnimationFrame(step);
  };
  step();
}
setTimeout(() => {
  const rc = document.getElementById('repo-count');
  if (rc) animateCount(rc, 23);
}, 1200);