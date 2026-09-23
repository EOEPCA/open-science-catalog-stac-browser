<template>
  <b-alert class="deprecation" :variant="variant" show>
    <h3>{{ title }}</h3>
    <Description :description="message" inline />
    <ul v-if="canonicalLink || latestLink || successorLink || predecessorLink">
      <li v-if="canonicalLink" class="canonical">
        {{ $t('deprecation.canonicalVersion') }}
        <StacLink :data="canonicalLink" :title="canonicalLinkTitle" :fallbackTitle="$t('deprecation.fallbackTitle')" />
      </li>
      <li v-if="latestLink" class="latest">
        {{ $t('deprecation.latestVersion') }}
        <StacLink :data="latestLink" :title="latestLinkTitle" :fallbackTitle="$t('deprecation.fallbackTitle')" />
      </li>
      <li v-if="successorLink" class="successor">
        {{ $t('deprecation.successorVersion') }}
        <StacLink :data="successorLink" :title="successorLinkTitle" :fallbackTitle="$t('deprecation.fallbackTitle')" />
      </li>
      <li v-if="predecessorLink" class="predecessor">
        {{ $t('deprecation.predecessorVersion') }}
        <StacLink :data="predecessorLink" :title="predecessorLinkTitle" :fallbackTitle="$t('deprecation.fallbackTitle')" />
      </li>
    </ul>
  </b-alert>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import Description from './Description.vue';
import DeprecationMixin from './DeprecationMixin';

export default {
  name: 'DeprecationNotice',
  components: {
    StacLink: defineAsyncComponent(() => import('./StacLink.vue')),
    Description
  },
  mixins: [
    DeprecationMixin
  ],
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    canonicalLinkTitle() {
      if (!this.canonicalLink) {return null;}
      const rawTitle = this.canonicalLink.title ? String(this.canonicalLink.title).trim() : '';
      if (!rawTitle || rawTitle.toLowerCase() === 'canonical version' || rawTitle.toLowerCase() === 'canonical') {
        return this.$t('browse') || 'Overview';
      }
      return rawTitle;
    },
    latestLinkTitle() {
      return this.resolveVersionTitle(this.latestLink, ['latest version', 'latest'], this.$t('deprecation.fallbackTitle'));
    },
    successorLinkTitle() {
      return this.resolveVersionTitle(this.successorLink, ['successor version', 'next version', 'successor'], this.$t('deprecation.fallbackTitle'));
    },
    predecessorLinkTitle() {
      return this.resolveVersionTitle(this.predecessorLink, ['predecessor version', 'previous version', 'predecessor'], this.$t('deprecation.fallbackTitle'));
    },
    message() {
      let vars = {type: this.type};
      if (this.isDeprecated) {
        return this.$t('deprecation.warning', vars);
      }
      else if (this.isCanonical) {
        return this.$t('deprecation.canonicalNotice', vars);
      }
      else {
        return this.$t('deprecation.otherVersionsNotice', vars);
      }
    },
    variant() {
      return this.isDeprecated ? 'warning' : 'info';
    },
    title() {
      if (this.isDeprecated) {
        return this.$t('deprecated');
      }
      else if (this.isCanonical) {
        return this.$t('deprecation.canonicalTitle');
      }
      else if (this.latestLink || this.successorLink) {
        return this.$t('deprecation.outdatedTitle');
      }
      else {
        return this.$t('deprecation.otherVersionsTitle');
      }
    },
    type() {
      if (this.data.isItem) {
        return this.$t('stacItem', 1);
      }
      else if (this.data.isCollection) {
        return this.$t(`stacCollection`, 1);
      }
      else if (this.data.isCatalog) {
        return this.$t(`stacCatalog`, 1);
      }
      else {
        return '';
      }
    }
  },
  methods: {
    resolveVersionTitle(link, genericTitles, fallback) {
      if (!link) {return null;}
      const rawTitle = link.title ? String(link.title).trim() : '';
      const isGeneric = !rawTitle || genericTitles.includes(rawTitle.toLowerCase());
      if (!isGeneric) {
        return rawTitle;
      }
      // Check if there is another link with the same href and a descriptive title
      const allLinks = Array.isArray(this.data?.links) ? this.data.links : [];
      const matching = allLinks.find(
        l => l && l.href === link.href && l.title && !genericTitles.includes(String(l.title).trim().toLowerCase())
      );
      if (matching && matching.title) {
        return String(matching.title).trim();
      }
      // Extract version pattern from href (e.g. collection_v1.json -> v1)
      if (link.href) {
        const match = link.href.match(/_v?([0-9][0-9a-zA-Z._-]*)\.json$/);
        if (match && match[1]) {
          const v = match[1];
          return v.toLowerCase().startsWith('v') ? v : `v${v}`;
        }
      }
      return fallback;
    }
  }
};
</script>

<style lang="scss" scoped>
.deprecation {
  h3 {
    font-size: 1em;
    font-weight: 700;
    display: inline-block;
    margin: 0;
    margin-right: 1em;
  }
  ul {
    margin-top: 0.5em;
    margin-bottom: 0;
  }
  li {
    &.canonical {
      font-weight: 600;
    }
    &.latest {
      font-weight: 600;
    }
    &.successor {
      font-weight: 500;
    }
    &.predecessor {
      font-weight: 500;
    }
  }
}
</style>
