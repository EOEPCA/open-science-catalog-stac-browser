export default {
    catalogUrl: "https://esa-earthcode.github.io/open-science-catalog-metadata-staging/catalog.json",
    catalogTitle: "Open Science Catalog",
    catalogImage: null,
    allowExternalAccess: true, // Must be true if catalogUrl is not given
    allowedDomains: [],
    enforcedColorMode: "light",
    detectLocaleFromBrowser: false,
    storeLocale: false,
    locale: "en",
    fallbackLocale: "en",
    supportedLocales: [
//      "de",
//      "ar",
//      "de-CH",
//      "es",
        "en",
//      "en-GB",
//      "en-US",
//      "fr",
//      "fr-CA",
//      "fr-CH",
//      "it",
//      "it-CH",
//      "ro",
//      "ja",
//      "pt",
//      "pt-BR",
//      "id",
//      "pl",
//      "sv"
    ],
    apiCatalogPriority: null,
    useTileLayerAsFallback: false,
    displayGeoTiffByDefault: false,
    displayPreview: true,
    displayOverview: true,
    displayOverviewsForChildren: false,
    buildTileUrlTemplate: null,
    getMapSourceOptions: null,
    pathPrefix: "/",
    historyMode: "hash",
    cardViewMode: "list",
    cardViewSort: "asc",
    showKeywordsInItemCards: false,
    showKeywordsInCatalogCards: false,
    showThumbnailsAsAssets: false,
    searchResultsPerPage: null,
    itemsPerPage: null,
    collectionsPerPage: null,
    maxEntriesPerPage: 1000,
    defaultThumbnailSize: null,
    crossOriginMedia: null,
    requestHeaders: {},
    requestQueryParameters: {},
    socialSharing: [],
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
    authConfig: null,
    crs: {},
    footerLinks: null
};
