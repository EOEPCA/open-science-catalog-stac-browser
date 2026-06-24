import init from "./init";
import { STAC } from "stac-js";

init().then((appInstance) => {
  // In Vue 3, app.mount() returns the root component instance.
  // It has access to the global router and store.
  const router = appInstance.$router;
  const store = appInstance.$store;

  if (router && store) {
    // 1. External catalog query redirect hack (previously in StacBrowser.vue)
    router.beforeEach((to, from, next) => {
      if (to.query && to.query.external) {
        next({ path: `/external/${to.query.external}`, replace: true });
      } else {
        next();
      }
    });

    // 2. Notify parent portal of navigation changes (previously in StacBrowser.vue)
    router.beforeEach((to, _, next) => {
      window.parent.postMessage({
        navigate: to.path
      }, '*');
      next();
    });

    // 3. Listen for data injection from parent portal (previously in StacBrowser.vue / store/index.js)
    window.addEventListener(
      "message",
      (event) => {
        if (event.data && event.data.data) {
          const data = event.data.data;
          
          // Dynamically define the "force" mutation on the store if it doesn't exist
          if (store._mutations && !store._mutations.force) {
            store._mutations.force = [
              (payload) => {
                if (!payload) {return;}
                store.state.data = new STAC(payload);
                store.state.title = payload.title;
              }
            ];
          }
          store.commit("force", data);
        }
      },
      false,
    );
  }
});
