<template>
  <div class="iframe-wrapper">
    <iframe
      id="indexIframe"
      :src="iframeSrc"
      title="Open Science Catalog"
      width="100%"
      height="100%"
      style="border: none; width: 100%; height: 100%;"
    ></iframe>
  </div>
</template>

<script>
import CONFIG from '@/merged-config';

export default {
  name: "LandingPage",
  computed: {
    iframeSrc() {
      // Resolve static metadata catalog URL (default to EarthCODE staging GitHub Page)
      const baseUrl = CONFIG.staticEndpoint || "https://esa-earthcode.github.io/open-science-catalog-metadata/";
      
      // Use the config.catalogUrl as the API endpoint for static pages
      // Fallback to the EarthCODE staging API
      const apiUrl = CONFIG.catalogUrl || "https://eoapi.workspace.earthcode-staging.earthcode.eox.at/stac";

      const params = new URLSearchParams({
        baseUrl,
        apiUrl,
        fontUrl: `${window.location.origin}${CONFIG.pathPrefix}css/fonts/notesesabold/NotesESAbold.ttf`,
      });

      return `${CONFIG.pathPrefix}index-static.html?${params.toString()}`;
    },
  },
};
</script>

<style scoped>
.iframe-wrapper {
  width: 100%;
  height: calc(100vh - 101px); /* Header 64px + compact footer 37px */
}
</style>
