// ---------- footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- cursor glow ----------
const glow = document.getElementById('cursor-glow');
let glowActive = false;

window.addEventListener('pointermove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
  if (!glowActive) {
    glow.classList.add('active');
    glowActive = true;
  }
});
window.addEventListener('pointerleave', () => {
  glow.classList.remove('active');
  glowActive = false;
});

// ---------- ripple click effect on cards ----------
document.querySelectorAll('.link-card').forEach((card) => {
  card.addEventListener('click', function (e) {
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.2;
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ---------- floating particles (canvas, lightweight) ----------
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let width, height, particles;
  const COUNT = 42;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function makeParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -Math.random() * 0.18 - 0.03,
      alpha: Math.random() * 0.4 + 0.15,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#4F8CFF';
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('resize', () => { resize(); makeParticles(); });
  resize();
  makeParticles();
  if (!reduceMotion) requestAnimationFrame(tick);
})();
