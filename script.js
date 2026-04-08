const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");
const revealElements = Array.from(document.querySelectorAll(".reveal"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeMobileMenu() {
  if (!siteNav || !navToggle) {
    return;
  }
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function initNavigation() {
  if (!siteNav || !navToggle) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    },
    { passive: true }
  );
}

function initHeaderState() {
  if (!header) {
    return;
  }

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  if (reduceMotion || typeof IntersectionObserver !== "function") {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${(index % 6) * 55}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initYear() {
  const yearNode = document.querySelector("#year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

initNavigation();
initHeaderState();
initReveal();
initYear();
