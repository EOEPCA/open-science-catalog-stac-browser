<template>
  <BButton v-if="button" class="stac-link" :id="id" :title="tooltip" v-bind="attributes">
    <slot>
      <img v-if="icon && !hideIcon" :src="icon.getAbsoluteUrl()" :alt="icon.title" :title="icon.title" class="icon me-2">
      <span class="title">{{ displayTitle }}</span>
    </slot>
  </BButton>
  <router-link
    v-else-if="isStacBrowserLink"
    :to="href"
    custom
    v-slot="{ navigate, isActive, isExactActive }"
  >
    <a
      class="stac-link"
      :class="{ 'router-link-active': isActive, 'router-link-exact-active': isExactActive }"
      :id="id"
      :title="tooltip"
      :href="cleanHref"
      :rel="link.rel"
      :tabindex="id ? 0 : undefined"
      @click="onNavigate($event, navigate)"
    >
      <slot>
        <img v-if="icon && !hideIcon" :src="icon.getAbsoluteUrl()" :alt="icon.title" :title="icon.title" class="icon me-2">
        <span class="title">{{ displayTitle }}</span>
      </slot>
    </a>
  </router-link>
  <a
    v-else
    class="stac-link"
    :id="id"
    :title="tooltip"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :tabindex="id ? 0 : undefined"
  >
    <slot>
      <img v-if="icon && !hideIcon" :src="icon.getAbsoluteUrl()" :alt="icon.title" :title="icon.title" class="icon me-2">
      <span class="title">{{ displayTitle }}</span>
    </slot>
  </a>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapGetters } from 'vuex';
import { BButton } from 'bootstrap-vue-next';
import { stacBrowserNavigatesTo } from "../rels";
import { isObject, size, URI } from 'stac-js/src/utils.js';
import { isStacMediaType } from 'stac-js/src/mediatypes.js';
import { getDisplayTitle } from '../models/stac';
import { STAC } from 'stac-js';
import CONFIG from '../merged-config';

export default defineComponent({
  name: "StacLink",
  components: {
    BButton
  },
  props: {
    data: {
      type: [Object, Array],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    fallbackTitle: {
      type: [String, Function],
      default: ""
    },
    tooltip: {
      type: String,
      default: null
    },
    button: {
      type: [Boolean, Object],
      default: false
    },
    state: {
      type: Object,
      default: null
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState(['allowExternalAccess', 'privateQueryParameters']),
    ...mapGetters(['toBrowserPath', 'getRequestUrl', 'isExternalUrl']),
    icon() {
      if (this.stac instanceof STAC) {
        const icons = this.stac.getIcons();
        if (icons.length > 0) {
          return icons[0];
        }
      }
      return null;
    },
    stac() {
      if (this.data instanceof STAC) {
        return this.data;
      }
      else if (Array.isArray(this.data)) {
        return this.data.find(o => o instanceof STAC);
      }
      else {
        return null;
      }
    },
    link() {
      if (this.isLink(this.data)) {
        return this.data;
      }
      else if (Array.isArray(this.data)) {
        return this.data.find(o => this.isLink(o)) || {};
      }
      else {
        return {};
      }
    },
    isStacBrowserLink() {
      if (this.stac) {
        return true;
      }
      if (!isStacMediaType(this.link.type, true)) {
        return false;
      }
      if (!this.allowExternalAccess && this.isExternalUrl(this.link.href)) {
        return false;
      }
      return stacBrowserNavigatesTo.includes(this.link.rel);
    },
    attributes() {
      if (this.isStacBrowserLink || this.button) {
        let obj = {
          to: this.href,
          rel: this.link.rel
        };
        if (isObject(this.button)) {
          Object.assign(obj, this.button);
        }
        return obj;
      }
      else {
        const obj = {
          href: this.href,
          target: '_blank',
          rel: this.link.rel,
        };
        if (this.id) {
          // Add tab index when an ID is given for popovers to make it clickable on MacOS (#655)
          obj.tabindex = 0;
        }
        return obj;
      }
    },
    component() {
      if (this.button) {
        return BButton;
      }
      return this.isStacBrowserLink ? 'router-link' : 'a';
    },
    href() {
      if (this.stac || this.isStacBrowserLink) {
        let href;
        if (this.stac instanceof STAC) {
          href = this.toBrowserPath(this.stac);
        }
        else {
          href = this.toBrowserPath(this.link);
        }
        // Normalize to start with a slash for router-link navigation
        if (!href.startsWith('/')) {
          href = '/' + (href || '');
        }

        // Add private query parameters to links: https://github.com/radiantearth/stac-browser/issues/142
        if (size(this.privateQueryParameters) > 0 || size(this.state) > 0) {
          let uri = URI(href);
          let addParameters = (obj, prefix) => {
            for(let key in obj) {
              let queryKey = `${prefix}${key}`;
              if (!uri.hasQuery(queryKey)) {
                uri.addQuery(queryKey, obj[key]);
              }
            }
          };
          addParameters(this.privateQueryParameters, '~');
          addParameters(this.state, '.');
          href = uri.toString();
        }

        return href;
      }
      else {
        return this.getRequestUrl(this.link.href);
      }
    },
    externalRel() {
      const rel = this.link.rel || '';
      return rel ? `${rel} noopener noreferrer` : 'noopener noreferrer';
    },
    cleanHref() {
      if (!this.href) {
        return '';
      }
      let clean = this.href.replace(/\.json($|\?)/, '$1');
      const prefix = (CONFIG.pathPrefix || '/').replace(/\/$/, '');
      if (prefix && !clean.startsWith(prefix)) {
        clean = `${prefix}${clean}`;
      }
      return clean;
    },
    displayTitle() {
      if (this.title) {
        return this.title;
      }

      let fallback = typeof this.fallbackTitle === 'function' ? this.fallbackTitle() : this.fallbackTitle;
      return getDisplayTitle(this.data, fallback);
    }
  },
  methods: {
    isLink(o) {
      return isObject(o) && !(o instanceof STAC);
    },
    onNavigate(event, navigate) {
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || (event.button !== undefined && event.button !== 0)) {
        return;
      }
      navigate(event);
    }
  }
});
</script>
