# Site Rendering Resilience Design

- Date: 2026-07-24
- Scope: `lumanmantech.cn` static GitHub Pages site

## Problem

The navigation is static HTML, but the content sections use the `.reveal` class. That class currently starts at `opacity: 0`, and `script.js` is the only code that adds the visible class. A transient `502` while loading `script.js` therefore leaves visitors with only the navigation.

## Design

1. Treat readable HTML as the default state. `.reveal` will no longer hide content before JavaScript has executed.
2. Add the `js` class to the root element as the first operation in `script.js`. Only `.js .reveal` receives the hidden animation start state.
3. Replace the direct script tag with a two-source loader. It attempts the custom-domain script first, then falls back to an immutable jsDelivr copy of the same release on an error event. The mirror serves JavaScript with an executable MIME type.
4. Keep existing data fallbacks and reduced-motion behavior unchanged.

## Acceptance Criteria

1. With `script.js` blocked, the page body remains readable and the navigation anchors lead to visible sections.
2. With `script.js` loaded, current reveal animations still run.
3. If the custom-domain script returns an error, the GitHub Raw script is requested and page initialization continues.
4. The site and its static resource requests return successful responses after deployment.
