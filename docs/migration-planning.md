# Migration and Custom Landing Page Integration Plan

This document outlines the architectural plan for migrating static pages from another repository into this fork and integrating a completely self-contained custom HTML landing page as the root view of this repository, replacing the default STAC Browser index view.

---

## 1. Objectives and Requirements

1. **Custom Landing Page**: Replace the default STAC Browser index page at the root (`/`) with a custom, completely self-contained HTML file (including its own inline or referenced styles, scripts, and media).
2. **Page Migration**: Move other pages from the previous repository into this fork, making sure they are accessible and do not conflict with the STAC Browser's routing or build system.
3. **Preserve STAC Browser**: Keep the STAC Browser fully functional for catalog, collection, and item browsing, with zero risk of breaking core Vue features or routes.
4. **Asset & CSS Isolation**: Prevent CSS style pollution or JavaScript conflicts between the self-contained landing/migrated pages and the Vue/Bootstrap-based STAC Browser.

---

## 2. Proposed Architectural Approaches

We have evaluated three distinct approaches to integrate the self-contained landing page and other migrated pages with the STAC Browser.

### Approach A: Multi-Page Application (MPA) in Vite (Recommended)

Vite natively supports Multi-Page Applications. We can configure Vite to build multiple separate HTML entry points.

*   **Structure**:
    *   `/index.html`: The custom landing page (and any other migrated static HTML files placed in appropriate folders).
    *   `/browser/index.html` (or `/browser.html`): The entry point for the Vue-based STAC Browser.
*   **Vite Configuration (`vite.config.js`)**:
    We modify the Rollup build options in `vite.config.js` to define multiple entry point inputs:
    ```javascript
    import { resolve } from 'node:path';

    // inside defineConfig -> build:
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),           // Custom landing page
        browser: resolve(__dirname, 'browser/index.html')  // STAC Browser Vue app
      },
      external: ["fs/promises"],
    }
    ```
*   **Routing**:
    *   Root `/` (or `/index.html`) loads the custom landing page.
    *   A link on the landing page (e.g., "Explore Catalog") points to `/browser/` (which loads the STAC Browser app).
    *   Since STAC Browser runs in `hash` history mode in this fork (e.g., `/stac-browser/#/`), the router inside the browser app will mount and function perfectly at `/browser/#/` without any conflicts.
*   **Pros**:
    *   **Absolute Isolation**: The landing page styles and scripts will never leak into the STAC Browser, and vice versa.
    *   **Zero Core Modifications**: No need to rewrite/convert the self-contained HTML landing page into Vue SFC template syntax.
    *   **Simplicity**: Build outputs are completely static and can be hosted anywhere (GitHub Pages, S3, NGINX).
*   **Cons**:
    *   Requires a minor file path adjustment to place the STAC Browser HTML entry point inside a `/browser` subfolder (or as `/browser.html`).

---

### Approach B: Vue Router Route-Based Component (Single-Page App)

Convert the self-contained HTML landing page into a Vue component and mount it at the root `/` path inside the existing Vue Router.

*   **Structure**:
    *   A new component `src/views/LandingPage.vue` is created.
    *   The HTML is pasted into the template, and its CSS is placed inside `<style scoped>`.
    *   In `src/router/index.js`, we map `path: "/"` to `LandingPage.vue`.
*   **Pros**:
    *   Keep a single unified HTML build file (`index.html`).
*   **Cons**:
    *   **Styling & Script Conflicts**: Self-contained HTML pages often have global CSS rules, custom fonts, or third-party JS libraries that can break or be broken by STAC Browser's global SCSS (Bootstrap/VuePic).
    *   **Vue SFC Overhead**: Converting a completely self-contained static HTML page (which may contain inline `<script>` or `<style>` blocks) into a Vue Single File Component can be tedious and error-prone.

---

### Approach C: Deploy-Time Routing (Reverse Proxy)

Keep the two repositories/builds separate, and handle routing at the web server (NGINX, Apache) or hosting platform level.

*   **Structure**:
    *   The custom landing page and other migrated pages are deployed at the root `/`.
    *   The STAC Browser build output is deployed to a subfolder, e.g., `/browser/`.
*   **Pros**:
    *   No change to either project's build setup.
*   **Cons**:
    *   Splits the codebase across two places, making maintenance, local development, and CI/CD pipelines more complex.

---

## 3. Recommended Implementation Steps (Approach A)

To implement the recommended **Multi-Page App (MPA)** approach, follow these steps:

### Step 1: Restructure the Files
Create a new directory called `browser` in the project root, and move the original STAC Browser files there.
```bash
mkdir browser
mv index.html browser/index.html
```

### Step 2: Configure Vite for MPA
Update the `vite.config.js` build configuration to specify both the landing page (`index.html`) and the browser application (`browser/index.html`):

```javascript
// At the top of vite.config.js, import resolve:
import { resolve } from 'node:path';

// Update defineConfig:
export default defineConfig(async ({ mode }) => {
  // ... (keep existing env loading and parsing)

  return ({
    base: config.pathPrefix,
    build: {
      sourcemap: mode !== "minimal",
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),           // Custom landing page
          browser: resolve(__dirname, 'browser/index.html')  // STAC Browser Vue app
        },
        external: ["fs/promises"],
      },
    },
    // ... (rest of the config remains unchanged)
```

### Step 3: Add the Custom Landing Page
Place the self-contained landing page HTML as `index.html` in the root of the project.
*   Make sure any assets (images, CSS, JS) used by the landing page are placed in a folder like `public/landing-assets/` or imported appropriately.
*   In the landing page HTML, link to the STAC Browser using a relative path, e.g.:
    ```html
    <a href="./browser/">Launch STAC Browser</a>
    ```

### Step 4: Migrate Other Pages
Other static pages from the previous repository can be added in a similar fashion:
*   Either place them as standalone HTML files in the root or custom subfolders (e.g., `about.html`, `help.html`) and add them to the `rollupOptions.input` object in `vite.config.js`.
*   Or place them in the `public/` directory if they do not need Vite preprocessing (this is the easiest option for pure, self-contained HTML pages, as Vite copies everything in `public/` directly to the output build folder unchanged).

---

## 4. Local Development & Testing

When running `npm start` (Vite dev server), both pages will be served and fully functional:
*   Visiting `http://localhost:8080/` will load the custom landing page.
*   Visiting `http://localhost:8080/browser/` will load the STAC Browser Vue application.

This provides an exceptional developer experience because changes to both the landing page and the browser app can be previewed in real-time.
