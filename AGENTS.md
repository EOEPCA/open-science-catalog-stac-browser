# Open Science Catalog (OSC) STAC Browser - Guide for Coding Agents

This repository is a customized fork of [`radiantearth/stac-browser`](https://github.com/radiantearth/stac-browser) tailored for the European Space Agency's (ESA) **Open Science Catalog (OSC)**. 

To maintain effortless upgradeability against the upstream repository, this fork is designed with a **"Zero-Touch Core"** principle. The core STAC Browser source files are kept completely vanilla, with customizations implemented using official STAC Browser extension points, configurations, and a clever iframe-based layout isolation wrapper.

---

## 1. Architectural Overview

The application is structured as a **Multi-Page Application (MPA)** in Vite, running two distinct layered applications:

```
               +-------------------------------------------------------------+
               |                       OUTER SHELL APP                       |
               |       index.html (custom/frame-main.js & StacBrowserWrapper) |
               |                                                             |
               |   +--------------+  +---------------+  +-----------------+  |
               |   |   ESA Header |  | Side Nav      |  | Cookie Banner   |  |
               |   +--------------+  +---------------+  +-----------------+  |
               |                                                             |
               |   +-----------------------------------------------------+   |
               |   |                  ROUTER VIEWS / IFRAMES             |   |
               |   |                                                     |   |
               |   |  / -> index-static.html (Home)                      |   |
               |   |  /search -> search.html (Search via EOX Itemfilter) |   |
               |   |  /metrics -> metrics.html (Stats & Charts)          |   |
               |   |                                                     |   |
               |   |  /catalog/* -> catalog.html                         |   |
               |   |    +---------------------------------------------+  |   |
               |   |    |              INNER APP (STAC)               |  |   |
               |   |    |    catalog.html (src/main.js & Catalog.vue) |  |   |
               |   |    +---------------------------------------------+  |   |
               |   +-----------------------------------------------------+   |
               +-------------------------------------------------------------+
```

### A. The Outer Shell App (`index.html` / `custom/`)
- **Routing**: Handled by `custom/frame-main.js` which matches routes for `/` (Landing), `/metrics`, `/search`, `/terms`, `/privacy-notice`, and matches everything else (`/:pathMatch(.*)*`) to `/catalog` (browsing).
- **Global Layout**: `custom/StacBrowserWrapper.vue` wraps all routes. It displays the ESA header and footer, a side drawer, a cookie banner, and a floating context-aware "Suggest changes" button that links directly to the OSC metadata GitHub repository and editor.
- **Dynamic Catalog Mounting (`custom/views/CatalogPage.vue`)**:
  - Renders `catalog.html` inside an `<iframe>`.
  - Listen for `postMessage` from the inner browser to sync the parent's address bar route (e.g. inner navigation to `/collection/xyz` translates to parent route `/collection/xyz`).
  - Watches parent route changes to sync the browser back/forward history back into the iframe hash route (`catalog.html#/<path>.json`).

### B. The Inner Browser App (`catalog.html` / `src/`)
- Renders the actual STAC Browser.
- Customizations inside `/src` are extremely narrow and isolated to maintain mergeability:
  - **`src/main.js`**: Patched with a ~45-line helper to post messages to the parent window during routing (`router.beforeEach`), listen for data injection from parent (via the `"force"` mutation), and redirect external query URLs.
  - **`src/theme/`**: SCSS variables modified for ESA brand identity (`$primary: #003247` deep blue, `$secondary: #335E6F` slate blue) and headings configured to use the custom `"NotesESAbold"` font.
  - No core Vue views (e.g. `src/views/Catalog.vue`) or components are modified.

---

## 2. Customize Using Extension Points

Instead of hacking the STAC Browser codebase, we leverage upstream's native extension hooks:

### A. Custom Widgets (`src/widgets/` & `widgets.config.js`)
Upstream's dynamic widget system is used to inject custom sections onto the Catalog page:
- **`widgets.config.js`**: Registers custom widgets under hooks like `'view-catalog-meta-end'`.
- **`src/widgets/FairAssessment.vue`**: Computes FAIR accessibility metrics and renders a multi-layer donut chart using the `<eox-chart>` web component.
- **`src/widgets/ForumTopics.vue`**: Queries the EarthCODE Discourse API by catalog title and displays related forum topics, comments, and links to start new discussions.

### B. Custom Preprocessing & Parameters (`config.js`)
Configured to optimize STAC Browser for OSC data models:
- **`historyMode: "hash"`** is used for the inner iframe to prevent routing collisions with the outer shell.
- **`preprocessSTAC`**: An upstream hook configured to intercept item (`Feature`) objects and map standard STAC `"child"` relations (which shouldn't technically be under items, but are present in OSC models) into `"related"` links while prepending categories (e.g. `Experiment: `, `Workflow: `, `Product: `).

### C. Custom Metadata Fields (`fields.config.js`)
Utilizes `@radiantearth/stac-fields` to format OSC-specific extension fields:
- Adds fields mapping for themes, contacts, variables, missions, and projects.
- Extends `ignoreMetadata` to filter out `'access'` and `'fair:*'` fields from the default metadata tables since they are already rendered by the `FairAssessment` widget.

### D. Custom Basemaps (`basemaps.config.js`)
- Customized to use EOX Terrain Light tiles instead of the default OpenStreetMap layer.

---

## 3. Separation of Concerns & Cleanliness Improvements

When implementing new customizations, adhere to these recommendations to make code cleaner and upgrades safer:

### 1. Fix Hardcoded Path Prefixes in `fields.config.js`
- **Issue**: `formatLink` currently has a hardcoded path prefix:
  ```javascript
  return Helper.toLink(`/stac-browser/#/${type}/${value}/${jsonName}.json`, ...);
  ```
- **Improvement**: Replace the hardcoded `/stac-browser` with relative routing or dynamically prepend `CONFIG.pathPrefix` from the STAC Browser configuration.

### 2. Move External Scripts into Package Dependencies
- **Issue**: External web components like `<eox-chart>` are loaded via static CDN tags in `catalog.html`:
  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@eox/chart/dist/eox-chart.js"></script>
  ```
- **Improvement**: Install these web components as proper npm packages and import them locally where needed (e.g., inside `FairAssessment.vue`) to keep template entry points clean and robust.

### 3. Consolidate Duplicate Config Keys
- **Issue**: Custom static pages (`metrics.html`, `search.html`, `index-static.html`) dynamically receive `baseUrl` and `apiUrl` parameters passed via search queries in parent Vue views (`LandingPage.vue`, `MetricsPage.vue`, `SearchPage.vue`).
- **Improvement**: Standardize config lookup or inject these parameters from a single shared configuration layer (like `src/merged-config.js`) rather than recalculating or duplicating fallback strings inside separateVue view templates.

---

## 4. How to Safely Upgrade Upstream

When a new version of STAC Browser is released, follow this workflow to pull changes and merge without breaking OSC customizations:

### Step 1: Fetch and Merge Upstream
```bash
# Add upstream remote if not already present
git remote add radiantearth https://github.com/radiantearth/stac-browser.git

# Fetch latest branches
git fetch radiantearth

# Merge (or rebase) upstream's main branch into your working branch
git merge radiantearth/main
```

### Step 2: Resolve Conflicts in Configs
Vite, config templates, and locale configurations might have minor conflicts. Keep your custom config adjustments but accept upstream's new feature parameters.
- **Do not overwrite `widgets.config.js`, `fields.config.js`, or `basemaps.config.js` completely**—they are your custom extension configurations.
- Resolve any conflict in `src/main.js` in favor of retaining the navigation event triggers and message listeners.

### Step 3: Audit Hacks vs New Features
If STAC Browser introduces a feature that native-renders something we used a hack for:
- Delete the custom code or config hack.
- Migrate to the official configuration option inside `config.js` or `fields.config.js`.

### Step 4: Verify the Build
```bash
# Install dependencies
npm install

# Test local development server
npm start

# Build production bundles
npm run build
```
Ensure that both entry points (`index.html` and `catalog.html`) build cleanly and that navigation between pages synchronizes properly.
