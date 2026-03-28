# Jiuwan Single-Page Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (Chinese/English) single-page official website for Wuhan Jiuwan E-commerce with brand-backstory positioning, responsive layout, and contact information.

**Architecture:** A static website with semantic HTML sections, CSS variable-driven visual system, and vanilla JavaScript for language switching, mobile navigation, sticky-header behavior, and reveal animations. All copy is managed through a single `translations` dictionary and keyed with `data-i18n` attributes for deterministic rendering.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript

---

## File Structure

- Create: `D:/project/jiuwan/index.html` (single-page structure, i18n key hooks, semantic sections)
- Create: `D:/project/jiuwan/styles.css` (design tokens, layout, responsive rules, animations)
- Create: `D:/project/jiuwan/script.js` (i18n rendering, menu toggle, intersection observer, sticky header)
- Create: `D:/project/jiuwan/README.md` (run/view instructions and content maintenance notes)
- Create: `D:/project/jiuwan/docs/superpowers/plans/2026-03-28-jiuwan-single-page-website.md` (this plan)

### Task 1: Build Semantic Single-Page HTML Skeleton

**Files:**
- Create: `D:/project/jiuwan/index.html`
- Test: `D:/project/jiuwan/index.html`

- [ ] **Step 1: Write initial HTML scaffold with section anchors and i18n hooks**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>武汉久玩电子商务有限公司 | 官方网站</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Manrope:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="site-header" id="top">
      <!-- nav + language switch -->
    </header>
    <main>
      <section id="hero"></section>
      <section id="about"></section>
      <section id="capabilities"></section>
      <section id="process"></section>
      <section id="trust"></section>
      <section id="contact"></section>
    </main>
    <footer></footer>
    <script src="script.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Run a quick parse check in PowerShell**

Run: `Get-Content -Raw D:\project\jiuwan\index.html | Select-String -Pattern "<main>|<section id=\"hero\">|data-i18n"`
Expected: Output contains `main`, `hero`, and at least one `data-i18n` hit.

- [ ] **Step 3: Add full content blocks for all approved modules**

```html
<h1 data-i18n="hero.title">让品牌在电商平台被看见、被信任、被选择。</h1>
<p data-i18n="hero.subtitle"></p>
<a class="btn btn-primary" href="#contact" data-i18n="hero.cta"></a>
```

- [ ] **Step 4: Verify contact information is present and exact**

Run: `Get-Content -Raw D:\project\jiuwan\index.html | Select-String -Pattern "yuanluge@2925.com|武汉市江夏经济开发区南湖路锦绣良缘B4幢1层1-101"`
Expected: Both email and address appear exactly once or more.

- [ ] **Step 5: Commit checkpoint (if git available)**

```bash
git add index.html
git commit -m "feat: add jiuwan single-page html structure"
```

### Task 2: Implement Visual Design and Responsive Layout

**Files:**
- Create: `D:/project/jiuwan/styles.css`
- Test: `D:/project/jiuwan/styles.css`

- [ ] **Step 1: Define design tokens and typography variables**

```css
:root {
  --color-primary: #2c8e83;
  --color-bg: #f6f3ed;
  --color-ink: #1f2a2e;
  --color-accent: #f2a65a;
  --font-zh: "Noto Sans SC", "Microsoft YaHei", sans-serif;
  --font-en: "Manrope", sans-serif;
  --font-display-zh: "ZCOOL XiaoWei", serif;
  --font-display-en: "Cormorant Garamond", serif;
}
```

- [ ] **Step 2: Build section layouts, cards, and CTA styles**

```css
.hero {
  min-height: 84vh;
  display: grid;
  align-items: center;
}
.capability-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
}
```

- [ ] **Step 3: Add responsive breakpoints and mobile navigation behavior styles**

```css
@media (max-width: 768px) {
  .nav-toggle { display: inline-flex; }
  .site-nav { display: none; }
  .site-nav.is-open { display: grid; }
}
```

- [ ] **Step 4: Add reveal animation classes with reduced-motion fallback**

```css
.reveal { opacity: 0; transform: translateY(20px); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.is-visible { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 5: Validate breakpoint selectors exist**

Run: `Get-Content -Raw D:\project\jiuwan\styles.css | Select-String -Pattern "@media \(max-width: 992px\)|@media \(max-width: 768px\)|@media \(max-width: 480px\)"`
Expected: Matches for all three responsive ranges.

### Task 3: Implement Behavior Layer (i18n + Interactions)

**Files:**
- Create: `D:/project/jiuwan/script.js`
- Modify: `D:/project/jiuwan/index.html` (ensure all texts map to keys)
- Test: `D:/project/jiuwan/script.js`

- [ ] **Step 1: Add translation dictionary and render function**

```js
const translations = {
  zh: { "hero.title": "让品牌在电商平台被看见、被信任、被选择。" },
  en: { "hero.title": "Help brands be seen, trusted, and chosen in e-commerce." }
};

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = translations[lang][key] ?? translations.zh[key] ?? "";
  });
}
```

- [ ] **Step 2: Add language switch + storage fallback logic**

```js
const saved = localStorage.getItem("language");
const currentLang = saved === "en" ? "en" : "zh";
applyLanguage(currentLang);
```

- [ ] **Step 3: Add mobile nav toggle and sticky header class updates**

```js
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
});
```

- [ ] **Step 4: Add IntersectionObserver for reveal animations**

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.2 });
```

- [ ] **Step 5: Syntax-check script and verify translation keys**

Run: `node --check D:\project\jiuwan\script.js`
Expected: No syntax errors printed.

Run: `Get-Content -Raw D:\project\jiuwan\script.js | Select-String -Pattern "hero.title|contact.email|contact.address"`
Expected: All required keys exist.

### Task 4: Final Polish and Delivery Validation

**Files:**
- Modify: `D:/project/jiuwan/index.html`
- Modify: `D:/project/jiuwan/styles.css`
- Modify: `D:/project/jiuwan/script.js`
- Create: `D:/project/jiuwan/README.md`

- [ ] **Step 1: Add README with run instructions and customization points**

```md
# Jiuwan Official Site
Open `index.html` directly in browser or serve via `npx serve .`.
Edit copy in `script.js` translations object.
```

- [ ] **Step 2: Run validation checks for required contact content in final build**

Run: `Get-Content -Raw D:\project\jiuwan\index.html, D:\project\jiuwan\script.js | Select-String -Pattern "yuanluge@2925.com|武汉市江夏经济开发区南湖路锦绣良缘B4幢1层1-101"`
Expected: Contact details are found in final rendered source paths.

- [ ] **Step 3: Run file inventory to confirm expected deliverables**

Run: `Get-ChildItem D:\project\jiuwan -File | Select-Object Name`
Expected: `index.html`, `styles.css`, `script.js`, `README.md` present.

- [ ] **Step 4: Optional local static serve smoke check**

Run: `npx --yes serve D:\project\jiuwan -l 4173`
Expected: Local URL prints and page loads in browser without broken layout.

- [ ] **Step 5: Commit final delivery (if git available)**

```bash
git add index.html styles.css script.js README.md
git commit -m "feat: deliver bilingual single-page official website for jiuwan"
```

## Self-Review

1. **Spec coverage:** The plan includes all approved requirements: single-page architecture, bilingual switch, warm service visual style, responsive layout, sticky nav, reveal animations, and accurate contact block.
2. **Placeholder scan:** No TODO/TBD markers or vague implementation-only instructions.
3. **Type consistency:** All references use consistent keys (`data-i18n`, `translations`, `applyLanguage`, `contact.email`, `contact.address`).
