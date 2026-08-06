// ==========================================================
// SHU YERNI O'ZGARTIRING — ism, rasm va linklaringizni kiriting
// ==========================================================
const PROFILE = {
  name: "EISNIX",
  tagline: "@eisnix",
  avatar: "avatar.webp",
};

const LINKS = [
  { label: "@eisnix", url: "https://www.instagram.com/eisnix", icon: "instagram" },
  { label: "@eisnix", url: "https://t.me/eisnix", icon: "telegram" },
  { label: "@iesnix", url: "https://x.com/iesnix", icon: "x" },
  // yangi link qo'shish uchun shu formatda qator qo'shing:
  // { label: "@handle", url: "https://example.com", icon: "link" },
];
// ==========================================================

// Lucide-uslubidagi aniq, stroke-based SVG ikonkalar
const ICONS = {
  github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.5h3.1l-6.77 7.74L22.5 21.5h-6.24l-4.89-6.39-5.6 6.39H2.66l7.24-8.27L1.5 2.5h6.4l4.42 5.84L18.24 2.5Zm-1.09 17.1h1.72L7.9 4.3H6.05l11.1 15.3Z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
};

const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

function render(){
  renderName(PROFILE.name);
  document.getElementById("tagline").textContent = PROFILE.tagline;
  document.getElementById("avatar").src = PROFILE.avatar;
  document.title = PROFILE.name + " — Links";

  const list = document.getElementById("linkList");
  list.innerHTML = "";

  LINKS.forEach(link => {
    const a = document.createElement("a");
    a.className = "link";
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `
      <span class="icon">${ICONS[link.icon] || ICONS.link}</span>
      <span class="handle">${link.label}</span>
      <span class="arrow">${ARROW}</span>
    `;
    list.appendChild(a);
  });
}

// Ismni har bir harfi alohida animatsiya bilan chiqishi uchun
function renderName(text){
  const el = document.getElementById("name");
  el.innerHTML = "";
  const baseDelay = 0.18;
  [...text].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.animationDelay = (baseDelay + i * 0.035) + "s";
    el.appendChild(span);
  });
}

render();

// ---- Karta uchun nozik "tilt" (magnit) effekti — faqat sichqonchali qurilmalarda ----
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!prefersReduced && supportsHover) {
  const card = document.getElementById("card");
  const maxTilt = 5; // daraja, juda nozik

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
  });

  // ---- Tugmalar uchun nozik magnit tortilish effekti ----
  const magnetStrength = 0.18; // qanchalik kuchli tortilsin (kichik = nozikroq)
  const magnetMax = 6; // piksel, maksimal siljish

  document.querySelectorAll('.link').forEach((link) => {
    let lastX = 0, lastY = 0;

    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * magnetStrength;
      const dy = (e.clientY - rect.top - rect.height / 2) * magnetStrength;
      lastX = Math.max(-magnetMax, Math.min(magnetMax, dx));
      lastY = Math.max(-magnetMax, Math.min(magnetMax, dy)) - 2;
      link.style.transform = `translate(${lastX.toFixed(1)}px, ${lastY.toFixed(1)}px) scale(1.015)`;
    });

    link.addEventListener('mousedown', () => {
      link.style.transform = `translate(${lastX.toFixed(1)}px, ${lastY.toFixed(1)}px) scale(.97)`;
    });

    link.addEventListener('mouseup', () => {
      link.style.transform = `translate(${lastX.toFixed(1)}px, ${lastY.toFixed(1)}px) scale(1.015)`;
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
    });
  });
}

// ---- Double-tap zoom oldini olish (ba'zi brauzerlar viewport meta'ga
// e'tibor bermasligi mumkin, shuning uchun qo'shimcha himoya) ----
let lastTouchEnd = 0;
document.addEventListener('touchend', function (e) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) e.preventDefault();
  lastTouchEnd = now;
}, { passive: false });

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
