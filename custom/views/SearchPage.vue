<template>
  <div class="iframe-wrapper">
    <iframe
      id="searchIframe"
      :src="iframeSrc"
      title="Search"
      width="100%"
      height="100%"
      style="border: none; width: 100%; height: 100%;"
    ></iframe>
  </div>
</template>

<script>
import CONFIG from '@/merged-config';

export default {
  name: "SearchPage",
  data() {
    return {
      productBaseUrl: "",
    };
  },
  computed: {
    iframeSrc() {
      const baseUrl = CONFIG.staticEndpoint || "https://esa-earthcode.github.io/open-science-catalog-metadata/";
      const apiUrl = CONFIG.apiUrl || "https://eoapi.workspace.earthcode-staging.earthcode.eox.at/stac";

      const params = new URLSearchParams({
        baseUrl,
        apiUrl,
        fontUrl: `${window.location.origin}${CONFIG.pathPrefix}css/fonts/notesesabold/NotesESAbold.ttf`,
      });

      if (this.productBaseUrl) {
        params.set("productBaseUrl", this.productBaseUrl);
      }

      return `${CONFIG.pathPrefix}search.html?${params.toString()}`;
    },
  },
  mounted() {
    // Set the productBaseUrl to point back to the catalog browse view
    this.productBaseUrl = window.location.origin + CONFIG.pathPrefix;
  },
};
</script>

<style scoped>
.iframe-wrapper {
  width: 100%;
  height: calc(100vh - 101px);
}
</style>
