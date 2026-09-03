import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import StacBrowserWrapper from "./StacBrowserWrapper.vue";
import { createBootstrap } from "bootstrap-vue-next/plugins/createBootstrap";
import { createStore } from "vuex";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const store = createStore({
  state() {
    return {
      data: null
    };
  },
  getters: {
    isCollection: () => true
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    }
  }
});

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("./views/LandingPage.vue")
    },
    {
      path: "/metrics",
      name: "metrics",
      component: () => import("./views/MetricsPage.vue")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/SearchPage.vue")
    },
    // TODO: correct terms page
    // {
    //   path: "/terms",
    //   name: "terms",
    //   component: () => import("./views/TermsPage.vue")
    // },
    {
      path: "/privacy-notice",
      name: "privacy-notice",
      component: () => import("./views/PrivacyNoticePage.vue")
    },
    {
      path: "/fair",
      name: "fair",
      component: () => import("./views/FairPage.vue")
    },
    {
      path: "/fair-preview",
      name: "fair-preview",
      component: () => import("./views/FairPreviewPage.vue")
    },
    // Global catch-all route for any STAC Catalog browsing paths
    // e.g. /catalog, /projects/catalog, /collections/..., etc.
    {
      path: "/:pathMatch(.*)*",
      name: "catalog",
      component: () => import("./views/CatalogPage.vue")
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
});

const app = createApp(StacBrowserWrapper);
app.config.globalProperties.$t = (key) => {
  const translations = {
    fairAssessment: "FAIR Assessment"
  };
  return translations[key] || key;
};
app.use(createBootstrap());
app.use(store);
app.use(router);
app.mount("#app");
