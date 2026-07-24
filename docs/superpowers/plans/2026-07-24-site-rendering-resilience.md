# Site Rendering Resilience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the GitHub Pages site readable and recoverable when its primary JavaScript request fails.

**Architecture:** HTML content is visible by default. JavaScript opts into the reveal animation only after it starts; an inline loader tries the custom-domain asset then jsDelivr's GitHub mirror.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, GitHub Pages.

---

## File Structure

- Modify: `index.html` (resilient script loader)
- Modify: `styles.css` (progressive-enhancement reveal selectors)
- Modify: `script.js` (enable JavaScript-only animation state)

### Task 1: Make Server-Rendered Content Readable Without JavaScript

**Files:**
- Modify: `styles.css`
- Modify: `script.js`

- [ ] Change the reveal start state from `.reveal` to `.js .reveal`.
- [ ] Add `document.documentElement.classList.add("js");` before application initialization.
- [ ] Verify syntax with `node --check script.js`.
- [ ] Verify the CSS has both `.js .reveal` and `.js .reveal.is-visible` selectors.

### Task 2: Add a Separate Script Origin Fallback

**Files:**
- Modify: `index.html`

- [ ] Replace `<script src="./script.js"></script>` with an inline loader.
- [ ] Request `./script.js` first and `https://cdn.jsdelivr.net/gh/CLASSLU/CLASSLU.github.io@main/script.js` after an error event.
- [ ] Verify the local page renders with the primary script path.
- [ ] Verify a browser session with the primary script request blocked still exposes visible content.

### Task 3: Publish and Smoke-Test

**Files:**
- Modify: `data/site-content.json`
- Modify: `data/updates.json`
- Modify: `index.html`
- Modify: `script.js`
- Modify: `styles.css`

- [ ] Run whitespace and JavaScript syntax checks.
- [ ] Commit the existing content updates and resilience fix.
- [ ] Push `main` to `origin`.
- [ ] Confirm `https://lumanmantech.cn/` and `https://lumanmantech.cn/script.js` return `200`.
