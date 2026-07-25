# Engineering Archive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a static-first personal engineer archive using the supplied portrait, work scene, and technical-detail assets.

**Architecture:** `index.html` owns all readable content and image references; `styles.css` provides the responsive editorial system; `script.js` contains progressive interaction only.

**Tech Stack:** HTML, CSS, vanilla JavaScript, GitHub Pages.

---

### Task 1: Rebuild the Information Surface

**Files:**
- Modify: `index.html`

- [ ] Replace the SaaS-style hero, capability cards, and data-dependent sections with portrait, profile, route, project, build-log, and contact sections.
- [ ] Reference `picture/插图.png`, `picture/工作场景.png`, and `picture/技术细节.png` with descriptive alt text.

### Task 2: Implement the Editorial Interface

**Files:**
- Modify: `styles.css`

- [ ] Create paper-grid, route-line, project-archive, responsive, and dark-theme styles.
- [ ] Keep all content visible before JavaScript runs.

### Task 3: Add Progressive Interactions

**Files:**
- Modify: `script.js`

- [ ] Implement theme persistence, mobile navigation, section progress, reveal transitions, and a motion-reduced pointer trail.
- [ ] Verify syntax and browser rendering on desktop and mobile viewports.
