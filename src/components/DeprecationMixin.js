export default {
  computed: {
    isDeprecated() {
      return Boolean(this.data.getMetadata('deprecated'));
    },
    isCanonical() {
      return !this.isDeprecated && Boolean(this.data.getStacLinkWithRel('has-version'));
    },
    showDeprecation() {
      // Don't show deprecation notice on canonical overview collections
      if (this.isCanonical) {
        return false;
      }
      return this.isDeprecated || this.latestLink || this.successorLink || this.predecessorLink;
    },
    canonicalLink() {
      return this.data.getStacLinkWithRel('is-version-of');
    },
    latestLink() {
      return this.data.getStacLinkWithRel('latest-version');
    },
    successorLink() {
      const successor = this.data.getStacLinkWithRel('successor-version');
      if (successor && this.latestLink && successor.href === this.latestLink.href) {
        // Don't show successor if it's the same as latest
        return null;
      }
      return successor;
    },
    predecessorLink() {
      // Show prev. link only if not deprecated
      return !this.isDeprecated && this.data.getStacLinkWithRel('predecessor-version');
    }
  }
};
