<template>
  <b-container class="py-5">
    <b-row class="justify-content-center">
      <b-col md="12" lg="10" class="fair-preview-content">
        <h1 class="mb-2 text-uppercase text-primary">{{ title }}</h1>
        <h2 class="h5 mb-4 text-muted">FAIR Assessment Preview</h2>
        <hr class="mb-5">

        <div v-if="hasData" class="assessment-container">
          <FairAssessment />
        </div>
        <div v-else class="text-center py-5">
          <p class="text-danger">No FAIR data provided. Please specify FAIR scores as URL query parameters.</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent } from 'vue';
import FairAssessment from '@/widgets/FairAssessment.vue';
import { useStore } from 'vuex';

/**
 * FairPreviewPage.vue
 * 
 * A "secret" simple view used to preview the FAIR assessment score of a product (e.g. within PRs).
 * This page receives the catalog/product title and all the FAIR parameters via URL query parameters.
 * Since the collection JSON might not exist yet at preview time, this page constructs a transient,
 * local mock STAC collection object and commits it to the outer-shell Vuex store.
 * 
 * Usage Options:
 * 
 * 1. Full View (with Header, Footer, and Side Nav Menu)
 *    Displays the standard Open Science Catalogue layout wrapper around the FAIR assessment widget.
 *    Example:
 *    /fair-preview?title=My%20Product&fair:Findable_has_doi=false&fair:Findable_rich_metadata=true
 * 
 * 2. Embedded View (Borderless Widget - perfect for iframes/PR descriptions)
 *    Adding `embed=true` tells the StacBrowserWrapper to completely hide headers, footers, and cookie banners.
 *    Example:
 *    /fair-preview?title=My%20Product&fair:Findable_has_doi=false&fair:Findable_rich_metadata=true&embed=true
 * 
 * 3. Short Names Support (Simpler / shorter URLs)
 *    Instead of the long namespaced keys, standard short names are also supported and mapped automatically.
 *    Example:
 *    /fair-preview?title=My%20Product&Findable_has_doi=false&Findable_rich_metadata=true&embed=true
 * 
 * Values passed to the parameters can be true/false/1/0 or floats (e.g., 0.0 or 0.85).
 */
export default defineComponent({
  name: 'FairPreviewPage',
  components: {
    FairAssessment
  },
  data() {
    return {
      title: 'Product Title',
      hasData: false
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    this.parseQueryParams();
  },
  watch: {
    '$route.query': {
      handler() {
        this.parseQueryParams();
      },
      deep: true
    }
  },
  methods: {
    parseQueryParams() {
      const query = this.$route.query;
      
      this.title = query.title || 'Product Title';
      
      const fairData = {};
      let foundAny = false;
      
      const fairKeys = [
        "Findable_has_doi",
        "Findable_rich_metadata",
        "Findable_identifier",
        "Findable_stac_assets",
        "Findable_indexed",
        "Findable_indexed_approved_metadata",
        "Findable_indexed_approved_data",
        "Accessible_general",
        "Accessible_protocols",
        "Accessible_files",
        "Accessible_metadata",
        "Interoperable_uses_formal_language",
        "Interoperable_controlled_vocabularies",
        "Interoperable_related_links",
        "Interoperable_has_documentation",
        "Reusable_rich_descriptions",
        "Reusable_has_license",
        "Reusable_workflow_exists",
        "Reusable_cloud_assets_rate",
        "Reusable_has_visualisation",
        "Reusable_has_access_example"
      ];
      
      for (const key of fairKeys) {
        const value = query[`fair:${key}`] !== undefined ? query[`fair:${key}`] : query[key];
        
        if (value !== undefined) {
          foundAny = true;
          const lowerVal = String(value).toLowerCase();
          if (lowerVal === 'true' || lowerVal === '1') {
            fairData[`fair:${key}`] = true;
          } else if (lowerVal === 'false' || lowerVal === '0') {
            fairData[`fair:${key}`] = false;
          } else {
            const num = parseFloat(value);
            if (!isNaN(num)) {
              fairData[`fair:${key}`] = num;
            } else {
              fairData[`fair:${key}`] = value;
            }
          }
        }
      }
      
      if (foundAny) {
        this.hasData = true;
        const fakeCollection = {
          id: 'preview-collection',
          type: 'Collection',
          stac_version: '1.0.0',
          title: this.title,
          ...fairData
        };
        this.store.commit('setData', fakeCollection);
      } else {
        this.hasData = false;
        this.store.commit('setData', null);
      }
    }
  }
});
</script>

<style scoped>
.text-primary {
  color: #003247 !important;
}
.fair-preview-content h1 {
  font-family: "NotesESAbold", sans-serif;
}
</style>
