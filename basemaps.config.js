import { CRS } from 'leaflet';
import STAC from './src/models/stac';
import Utils from './src/utils';

const USGS_ATTRIBUTION = 'USGS Astrogeology';
const WMS = 'LWMSTileLayer';
const XYZ = 'LTileLayer';

const BASEMAPS = {
  earth: {
    url: '//tiles.maps.eox.at/wmts/1.0.0/terrain-light_3857/default/g/{z}/{y}/{x}.jpg',
    name: 'EOX Terrain Light',
    is: XYZ,
    attribution: 'Terrain light: Data &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors and <a href="//maps.eox.at/#data" target="_blank">others</a>, Rendering &copy; <a href="http://eox.at" target="_blank">EOX</a>'
  },
  europa: {
    baseUrl: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/jupiter/europa_simp_cyl.map',
    is: WMS,
    name: 'USGS Europa',
    attribution: USGS_ATTRIBUTION,
    crs: CRS.EPSG4326,
    format: 'image/png',
    layers: 'GALILEO_VOYAGER'
  },
  mars: {
    baseUrl: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map',
    is: WMS,
    name: 'USGS Mars',
    attribution: USGS_ATTRIBUTION,
    crs: CRS.EPSG4326,
    format: 'image/png',
    layers: 'MDIM21'
  },
  moon: {
    baseUrl: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/earth/moon_simp_cyl.map',
    is: WMS,
    name: 'USGS Moon',
    attribution: USGS_ATTRIBUTION,
    crs: CRS.EPSG4326,
    format: 'image/png',
    layers: 'LROC_WAC'
  }
};

/**
 * @typedef BasemapOptions
 * @type {Object}
 * @property {string} is Component: LWMSTileLayer or LTileLayer
 * @see https://vue2-leaflet.netlify.app/components/
 */

/**
 * 
 * @param {Object} stac The STAC object
 * @param {Object} map The Leaflet map object
 * @param {Object} i18n Vue I18N object
 * @returns {Array.<BasemapOptions>}
 */
export default function configureBasemap(stac, map, i18n) {
  let targets = ['earth'];
  if (stac instanceof STAC) {
    if (stac.isCollection() && Utils.isObject(stac.summaries) && Array.isArray(stac.summaries['ssys:targets'])) {
      targets = stac.summaries['ssys:targets'];
    }
    else if (stac.isCollection() && Array.isArray(stac['ssys:targets'])) {
      targets = stac['ssys:targets'];
    }
    else if (stac.isItem() && Array.isArray(stac.properties['ssys:targets'])) {
      targets = stac.properties['ssys:targets'];
    }
  }

  return targets.map(target => BASEMAPS[target.toLowerCase()]);
};
