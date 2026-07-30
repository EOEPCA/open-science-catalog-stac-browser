<template>
  <div id="app-shell">
    
    <!-- Top Nav Bar (Vanilla HTML/CSS) -->
    <header class="esa-header" v-if="!isEmbed">
      <button class="menu-toggle-btn" @click="drawerOpen = !drawerOpen" aria-label="Toggle Menu">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      <router-link to="/" class="esa-brand">Open Science Catalogue</router-link>
      
      <!-- Right-aligned ESA Logo -->
      <div class="esa-header-logo">
        <a href="https://www.esa.int/" target="_blank">
          <img src="/img/ESA_Logo.svg" alt="ESA Logo" height="30" />
        </a>
      </div>
    </header>

    <!-- Drawer Overlay -->
    <div v-if="!isEmbed" class="esa-drawer-overlay" :class="{ 'open': drawerOpen }" @click="drawerOpen = false"></div>

    <!-- Side Menu Drawer (Vanilla HTML/CSS) -->
    <aside v-if="!isEmbed" class="esa-drawer" :class="{ 'open': drawerOpen }">
      <div class="esa-drawer-header">
        <span class="esa-drawer-title">Menu</span>
        <button class="close-drawer-btn" @click="drawerOpen = false" aria-label="Close Menu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <nav class="esa-drawer-nav">
        <router-link to="/" class="nav-item" @click="drawerOpen = false">
          <i class="mdi mdi-home esa-nav-icon"></i>
          Home
        </router-link>
        <router-link to="/catalog" class="nav-item" @click="drawerOpen = false">
          <i class="mdi mdi-compass esa-nav-icon"></i>
          Catalogue
        </router-link>
        <router-link to="/metrics" class="nav-item" @click="drawerOpen = false">
          <i class="mdi mdi-poll esa-nav-icon"></i>
          Metrics
        </router-link>
        <router-link to="/search" class="nav-item" @click="drawerOpen = false">
          <i class="mdi mdi-magnify esa-nav-icon"></i>
          Search
        </router-link>
        <router-link to="/fair" class="nav-item" @click="drawerOpen = false">
          <i class="mdi mdi-information-outline esa-nav-icon"></i>
          FAIR Principles
        </router-link>
        <a :href="apiAccessUrl" target="_blank" class="nav-item" @click="drawerOpen = false">
          <i class="mdi mdi-xml esa-nav-icon"></i>
          API Access
          <i class="mdi mdi-open-in-new esa-nav-icon-right"></i>
        </a>
      </nav>
    </aside>

    <!-- Main Content Area containing our Router View -->
    <main class="flex-grow-1 position-relative">
      <router-view />
    </main>

    <!-- Cookie Banner -->
    <div v-if="showCookieBanner && !isEmbed" class="esa-cookie-banner">
      We use cookies which are essential for you to access our website and/or to
      provide you with our services, enable you to share our website content via
      your social media accounts and allow us to measure and improve the
      performance of our website.<br />
      <button class="cookie-btn" @click="consentCookies('accepted')">
        Accept all cookies
      </button>
      <button class="cookie-btn" @click="consentCookies('declined')">
        Accept only essential cookies
      </button>
      <router-link to="/privacy-notice" class="cookie-link">See our Cookie Notice</router-link>
    </div>

    <!-- Footer (Vanilla HTML/CSS) -->
    <footer class="esa-footer" v-if="!isEmbed">
      <div class="esa-footer-container">
        <div class="footer-left">
          &copy; {{ new Date().getFullYear() }} by 
          <a href="https://www.esa.int/" target="_blank" class="esa-footer-link">ESA</a>
        </div>
        <div class="footer-center">
          <!-- <router-link to="/terms" class="esa-footer-link">Terms & Conditions</router-link> -->
          <a href="https://www.esa.int/Services/Terms_and_conditions" target="_blank" class="esa-footer-link">Terms & Conditions</a>
          <span class="separator">|</span>
          <router-link to="/privacy-notice" class="esa-footer-link">Privacy Notice</router-link>
        </div>
        <div class="footer-right">
          <a href="https://github.com/EOEPCA/open-science-catalog-stac-browser" target="_blank" class="esa-footer-link">open-science-catalog</a>
          <span> v{{ appVersion }} by</span>
          <a href="https://eox.at" target="_blank" class="esa-footer-link ms-1">
            <img src="/img/EOX_Logo_weiss.svg" alt="EOX Logo" height="11" style="vertical-align: middle; margin-top: -3px;" />
          </a>
        </div>
      </div>

      <!-- Suggest Changes Floating Button -->
      <div v-if="isCatalogPage" class="suggest-changes-dial">
        <div class="suggest-changes-menu">
          <a
            v-if="currentPath"
            :href="editorUrl"
            target="_blank"
            class="suggest-btn btn-editor"
          >
            <i class="mdi mdi-pencil"></i>
            Edit metadata
          </a>
          <a
            v-if="currentPath"
            :href="githubUrl"
            target="_blank"
            class="suggest-btn btn-github"
          >
            <i class="mdi mdi-github"></i>
            View file on GitHub
          </a>
        </div>
        <button class="suggest-toggle-btn">
          <i class="mdi mdi-pencil pencil-icon"></i>
          <i class="mdi mdi-close close-icon"></i>
          <span class="btn-text">Suggest changes</span>
        </button>
      </div>
    </footer>

  </div>
</template>

<script>
import CONFIG from '@/merged-config';

export default {
  name: "StacBrowserWrapper",
  data: () => ({
    drawerOpen: false,
    showCookieBanner: false
  }),
  mounted() {
    const consent = localStorage.getItem('esa-cookies-consent');
    const hasCookieConsent = document.cookie.includes("mtm_cookie_consent") || document.cookie.includes("mtm_consent_removed");
    if (!consent && !hasCookieConsent) {
      this.showCookieBanner = true;
    }
  },
  watch: {
    $route(to) {
      if (to.fullPath.startsWith("/catalog")) {
        return;
      }
      if (window._paq) {
        window._paq.push(["setCustomUrl", to.fullPath]);
        window._paq.push([
          "setDocumentTitle",
          document.domain + "/" + document.title,
        ]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["enableLinkTracking"]);
      }
    }
  },
  methods: {
    consentCookies(status) {
      if (status === 'accepted') {
        if (window._paq) {
          window._paq.push(["rememberCookieConsentGiven"]);
        }
      } else {
        if (window._paq) {
          window._paq.push(["forgetCookieConsentGiven"]);
          window._paq.push(["optUserOut"]);
        }
      }
      localStorage.setItem('esa-cookies-consent', status);
      this.showCookieBanner = false;
    }
  },
  computed: {
    isEmbed() {
      return this.$route.name === 'fair-preview' && this.$route.query.embed === 'true';
    },
    appVersion() {
      return "3.0.0-rc.9";
    },
    apiAccessUrl() {
      const apiUrl = CONFIG.apiUrl || "https://eoapi.workspace.earthcode-staging.earthcode.eox.at/stac";
      return apiUrl.replace(/\/$/, "") + "/api.html";
    },
    isCatalogPage() {
      return this.$route.name === 'catalog';
    },
    currentPath() {
      let path = this.$route.path;
      if (path === "/" || path === "" || path === "/catalog") {
        return "/catalog";
      }
      return path;
    },
    sessionTitle() {
      const parts = this.currentPath.split("/");
      const lastPart = parts[parts.length - 1] || "catalog";
      return `Edit ${lastPart}`;
    },
    editorUrl() {
      const workspaceRoot = CONFIG.workspaceRoot || "https://workspace.earthcode-staging.earthcode.eox.at";
      return `${workspaceRoot}/osc-editor?session=${encodeURIComponent(this.sessionTitle)}&automation=edit-file&file=${encodeURIComponent(
        'https://raw.githubusercontent.com/ESA-EarthCODE/open-science-catalog-metadata/refs/heads/main' +
        this.currentPath +
        '.json'
      )}`;
    },
    githubUrl() {
      const githubDataRoot = CONFIG.githubDataRoot || "https://github.com/ESA-EarthCODE/open-science-catalog-metadata/tree/main";
      return `${githubDataRoot.replace(/\/$/, "")}${this.currentPath}.json`;
    }
  }
}
</script>

<style>
@font-face {
  font-family: "NotesESAbold";
  src: url("/css/fonts/notesesabold/NotesESAbold.eot");
  src: url("/css/fonts/notesesabold/NotesESAbold.woff") format("woff"),
    url("/css/fonts/notesesabold/NotesESAbold.ttf") format("truetype"),
    url("/css/fonts/notesesabold/NotesESAbold.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

#app-shell h1,
#app-shell h2,
#app-shell h3,
#app-shell h4,
#app-shell h5,
#app-shell h6 {
  font-family: "NotesESAbold", sans-serif;
  font-weight: normal;
}

/* Global Custom ESA Theme Palette & General Reset */
:root {
  --esa-primary: #003247;
  --esa-primary-light: #004d66;
  --esa-border-color: #335e6f;
  --esa-text-light: #ffffff;
}

html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  height: 100%;
}

#app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* Header Styling */
.esa-header {
  background-color: var(--esa-primary);
  border-bottom: 4px solid var(--esa-border-color);
  color: var(--esa-text-light);
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 999;
}

.menu-toggle-btn {
  background: transparent;
  border: none;
  color: var(--esa-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-right: 15px;
}

.menu-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.esa-brand {
  color: var(--esa-text-light);
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  font-family: "NotesESAbold", sans-serif;
}

.esa-brand:hover {
  color: var(--esa-text-light);
  text-decoration: none;
}

.esa-header-logo {
  margin-left: auto;
  display: flex;
  align-items: center;
}

/* Side Drawer Styling */
.esa-drawer-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.esa-drawer-overlay.open {
  opacity: 1;
  visibility: visible;
}

.esa-drawer {
  background-color: var(--esa-primary);
  color: var(--esa-text-light);
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  max-width: 80vw;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.esa-drawer.open {
  transform: translateX(0);
}

.esa-drawer-header {
  border-bottom: 1px solid var(--esa-border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
}

.esa-drawer-title {
  font-size: 1.15rem;
  font-weight: bold;
}

.close-drawer-btn {
  background: transparent;
  border: none;
  color: var(--esa-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.close-drawer-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.esa-drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
}

.nav-item {
  color: var(--esa-text-light);
  text-decoration: none;
  padding: 12px 25px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-exact-active {
  background-color: var(--esa-primary-light);
  color: var(--esa-text-light);
  text-decoration: none;
}

.esa-nav-icon {
  margin-right: 12px;
  font-size: 1.25rem;
}

.esa-nav-icon-right {
  margin-left: auto;
  font-size: 1rem;
  opacity: 0.7;
}

/* Footer Styling */
.esa-footer {
  background-color: var(--esa-primary);
  border-top: 4px solid var(--esa-border-color);
  color: var(--esa-text-light);
  padding: 6px 16px;
  z-index: 99;
  font-size: 0.85rem;
  position: relative;
}

.esa-footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

.esa-footer-link {
  color: var(--esa-text-light);
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

.esa-footer-link:hover {
  color: var(--esa-text-light);
  opacity: 0.8;
}

.separator {
  margin: 0 10px;
}

.flex-grow-1 {
  flex-grow: 1 !important;
}

.position-relative {
  position: relative !important;
}

/* Cookie Banner */
.esa-cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000;
  font-family: Arial, sans-serif !important;
  line-height: 1.5em !important;
  background-color: #0b1d26 !important;
  color: #fff !important;
  padding: 1.875rem !important;
  text-align: center !important;
  font-size: 0.75rem !important;
  border-top: 4px solid #335e6f !important;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.15);
}

.cookie-link {
  color: #fff !important;
  text-decoration: underline !important;
  margin: 20px 10px 10px !important;
  display: inline-block !important;
}

.cookie-link:hover {
  opacity: 0.8;
}

.cookie-btn {
  background-color: transparent !important;
  font-family: Arial, sans-serif !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.15625rem !important;
  border: 2px solid #335e6f !important;
  width: max-content !important;
  padding: 10px 20px !important;
  display: inline-block !important;
  border-radius: 2px !important;
  line-height: 1.5em !important;
  margin: 20px 10px 10px !important;
  text-align: center !important;
  text-decoration: none !important;
  color: #fff !important;
  transition: background 0.3s ease-in !important;
  text-transform: uppercase !important;
  cursor: pointer;
}

.cookie-btn:hover {
  background-color: #335e6f !important;
}

/* Suggest Changes Dial */
.suggest-changes-dial {
  position: absolute;
  bottom: calc(100% + 22px);
  right: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  z-index: 9999;
}

/* If the cookie banner is shown, push the floating button up so they don't overlap! */
.esa-cookie-banner ~ .esa-footer .suggest-changes-dial {
  bottom: calc(100% + 212px); /* Adjust bottom based on cookie banner height */
}

/* On mobile, adjust floating button position if needed */
@media (max-width: 767px) {
  .esa-cookie-banner ~ .esa-footer .suggest-changes-dial {
    bottom: calc(100% + 262px);
  }
}

.suggest-changes-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.suggest-changes-dial:hover .suggest-changes-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.suggest-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.btn-editor {
  background-color: #28a745;
  color: white;
}

.btn-editor:hover {
  background-color: #218838;
  color: white;
}

.btn-github {
  background-color: #24292e;
  color: white;
}

.btn-github:hover {
  background-color: #04090d;
  color: white;
}

.suggest-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #2196F3;
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.suggest-toggle-btn:hover {
  background-color: #0d8bf2;
  transform: scale(1.05);
}

.suggest-toggle-btn .close-icon {
  display: none;
}

.suggest-toggle-btn .pencil-icon {
  display: inline-block;
}

.suggest-changes-dial:hover .close-icon {
  display: inline-block;
}

.suggest-changes-dial:hover .pencil-icon {
  display: none;
}
</style>
