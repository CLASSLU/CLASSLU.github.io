document.documentElement.classList.add("js");

const body = document.body;
const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector("#themeToggle");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelector("#year").textContent = new Date().getFullYear();

function setTheme(dark) {
  body.classList.toggle("dark", dark);
  themeToggle.checked = dark;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#191a18" : "#f4f2ec");
}

setTheme(localStorage.getItem("theme") === "dark");
themeToggle.addEventListener("change", () => {
  const dark = themeToggle.checked;
  localStorage.setItem("theme", dark ? "dark" : "light");
  setTheme(dark);
});

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}));

window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 8), { passive: true });

const revealNodes = [...document.querySelectorAll(".reveal")];
if (reduceMotion || !window.IntersectionObserver) {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      instance.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealNodes.forEach((node) => observer.observe(node));
}

const railLinks = [...document.querySelectorAll(".section-rail a")];
const sections = railLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if (window.IntersectionObserver) {
  const railObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    railLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
  }), { rootMargin: "-35% 0px -55%", threshold: 0 });
  sections.forEach((section) => railObserver.observe(section));
}

if (!reduceMotion) {
  const canvas = document.querySelector(".trace-canvas");
  const context = canvas.getContext("2d");
  const points = [];
  let drawing = false;
  function resize() { canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`; context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
  function draw() { context.clearRect(0, 0, window.innerWidth, window.innerHeight); const now = performance.now(); while (points.length && now - points[0].time > 1000) points.shift(); if (points.length < 2) { drawing = false; return; } context.beginPath(); points.forEach((point, index) => { const alpha = Math.max(0, 1 - (now - point.time) / 1000); context.strokeStyle = `rgba(185, 66, 47, ${alpha * .7})`; context.lineWidth = 1.15; if (index === 0) context.moveTo(point.x, point.y); else { context.lineTo(point.x, point.y); context.stroke(); context.beginPath(); context.moveTo(point.x, point.y); } }); requestAnimationFrame(draw); }
  window.addEventListener("pointermove", (event) => { points.push({ x: event.clientX, y: event.clientY, time: performance.now() }); if (!drawing) { drawing = true; requestAnimationFrame(draw); } }, { passive: true });
  window.addEventListener("resize", resize); resize();
}
