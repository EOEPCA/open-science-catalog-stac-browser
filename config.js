module.exports = {
    catalogUrl: null,
    catalogTitle: "Open Science Catalog",
    allowExternalAccess: true, // Must be true if catalogUrl is not given
    allowedDomains: [],
    detectLocaleFromBrowser: false,
    storeLocale: false,
    locale: "en",
    fallbackLocale: "en",
    supportedLocales: [
        "de",
        "ar",
//      "de-CH",
        "es",
        "en",
//      "en-GB",
//      "en-US",
        "fr",
//      "fr-CA",
//      "fr-CH",
        "it",
//      "it-CH",
        "ro",
        "ja",
        "pt",
//      "pt-BR"
    ],
    apiCatalogPriority: null,
    useTileLayerAsFallback: true,
    displayGeoTiffByDefault: false,
    buildTileUrlTemplate: ({href, asset}) => "https://tiles.rdnt.io/tiles/{z}/{x}/{y}@2x?url=" + encodeURIComponent(href),
    stacProxyUrl: null,
    pathPrefix: "/stac-browser/",
    historyMode: "hash",
    cardViewMode: "list",
    cardViewSort: "asc",
    showKeywordsInItemCards: false,
    showKeywordsInCatalogCards: false,
    showThumbnailsAsAssets: false,
    geoTiffResolution: 128,
    redirectLegacyUrls: false,
    itemsPerPage: 12,
    maxItemsPerPage: 1000,
    defaultThumbnailSize: null,
    maxPreviewsOnMap: 50,
    crossOriginMedia: null,
    requestHeaders: {},
    requestQueryParameters: {},
    socialSharing: ['email', 'bsky', 'mastodon', 'x'],
    preprocessSTAC: (stac) => {
        if(stac.type === "Feature") {
            stac.links = stac.links.map(link => {
                if (link.rel === "child") {
                    link.rel = "related";
                    if (link.href.includes("/experiments/")) {
                      link.title = `Experiment: ${link.title}`;
                    }
                    if (link.href.includes("/workflows/")) {
                      link.title = `Workflow: ${link.title}`;
                    }
                    if (link.href.includes("/products/")) {
                      link.title = `Product: ${link.title}`;
                    }
                }
                return link;
            })
        }
        return stac;
    },
    authConfig: null
};
