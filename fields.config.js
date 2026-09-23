import { Registry, Helper } from '@radiantearth/stac-fields';
import config from './config.js';

// For details, please consult
// https://github.com/radiantearth/stac-browser/blob/main/docs/metadata.md

// ADD ADDITIONAL FIELDS AND EXTENSIONS HERE

// Registry.addExtension('osc', 'Open Science Catalogue');

// Registry.addMetadataField('themes', {
//     label: "Themes",
//     ext: "osc", 
//     formatter: value => {
//       if (!value) {
//         return "";
//       }
//       const formatConcept = (i) => {
//         if (!i) return "";
//         if (typeof i === 'object') {
//           return i.id || i.title || JSON.stringify(i);
//         }
//         return i;
//       };
//       if (Array.isArray(value)) {
//         const oscThemeObj = value.find(v => v && v.scheme === "OSC:SCHEME:THEMES");
//         if (oscThemeObj && Array.isArray(oscThemeObj.concepts)) {
//           return Helper.toList(oscThemeObj.concepts, true, formatConcept, false);
//         }
//         const themeWithConcepts = value.find(v => v && Array.isArray(v.concepts));
//         if (themeWithConcepts) {
//           return Helper.toList(themeWithConcepts.concepts, true, formatConcept, false);
//         }
//         return Helper.toList(value, true, formatConcept, false);
//       } else if (typeof value === 'object') {
//         if (Array.isArray(value.concepts)) {
//           return Helper.toList(value.concepts, true, formatConcept, false);
//         }
//         return formatConcept(value);
//       }
//       return String(value);
//     }
//   });

// Registry.addMetadataField('contacts', {
//     label: "Contacts",
//     ext: "osc",
// });

// const getPathPrefix = () => {
//   let prefix = config.pathPrefix || "/";
//   if (!prefix.startsWith("/")) {
//     prefix = "/" + prefix;
//   }
//   if (!prefix.endsWith("/")) {
//     prefix = prefix + "/";
//   }
//   return prefix;
// };

// const formatLink = (type, value, links, jsonName) => {
//   const link = links && Array.isArray(links) ? links.find(link => link.rel === 'related' && link.href && link.href.includes(value)) : null;
//   if (!link || !link.title) {
//     return value;
//   }
//   const parts = link.title.split(":");
//   const title = parts.length > 1 ? parts[1].trim() : link.title;
//   return Helper.toLink(`${getPathPrefix()}#/${type}/${value}/${jsonName}.json`, title, "", "_self");
// }

// Registry.addMetadataField('osc:project', {
//   label: "Project",
//   ext: "osc",
//   formatter: (value, field, spec, { links }) => {
//     return formatLink("projects", value, links, "collection")
//   }
// });

// Registry.addMetadataField('osc:themes', {
//   label: "Themes",
//   ext: "osc",
//   formatter: (value, field, spec, { links }) =>
//     value.map(theme => formatLink("themes", theme, links, "catalog")).join(", ")
// });

// Registry.addMetadataField('osc:variables', {
//   label: "Variables",
//   ext: "osc",
//   formatter: (value, field, spec, { links }) =>
//     value.map(variable => formatLink("variables", variable, links, "catalog")).join(", ")
// });

// Registry.addMetadataField('osc:missions', {
//   label: "Missions",
//   ext: "osc",
//   formatter: (value, field, spec, { links }) =>
//     value.map(mission => formatLink("eo-missions", mission, links, "catalog")).join(", ")
// });

const isSameNamespace = (doi, contextDoi) => {
  if (!doi) return false;
  const clean = String(doi).replace(/^https?:\/\/doi\.org\//i, '').trim();
  if (clean.startsWith('10.83395/') || clean.startsWith('10.85276/')) {
    return true;
  }
  if (contextDoi) {
    const cleanContext = String(contextDoi).replace(/^https?:\/\/doi\.org\//i, '').trim();
    const prefix = cleanContext.split('/')[0] + '/';
    if (prefix.startsWith('10.') && clean.startsWith(prefix)) {
      return true;
    }
  }
  return false;
};

const filterPublications = (pubs, contextDoi) => {
  if (!Array.isArray(pubs)) return [];
  return pubs.filter(item => {
    if (!item) return false;
    const doi = typeof item === 'string' ? item : item.doi;
    const citation = typeof item === 'object' ? item.citation : null;
    if (citation && String(citation).trim().length > 0) {
      return true;
    }
    if (isSameNamespace(doi, contextDoi)) {
      return false;
    }
    return true;
  });
};

Registry.addExtension('sci', 'Scientific Citation');

Registry.addMetadataField('sci:doi', {
  label: "DOI",
  formatter: (value, field, spec, context) => {
    if (!value) return "";
    const isCanonical = context?.links?.some(l => l.rel === 'has-version') && !context?.links?.some(l => l.rel === 'is-version-of');
    if (isCanonical) {
      spec.label = "Canonical DOI";
    } else if (context?.version) {
      const v = String(context.version).trim();
      const vFormatted = v.toLowerCase().startsWith('v') ? v : `v${v}`;
      spec.label = `DOI (${vFormatted})`;
    } else {
      spec.label = "DOI";
    }
    const cleanDoi = String(value).replace(/^https?:\/\/doi\.org\//i, "");
    return `<a href="https://doi.org/${cleanDoi}" target="_blank" rel="noopener noreferrer">${cleanDoi}</a>`;
  }
});

Registry.addMetadataField('sci:publications', {
  label: "Publications & Additional DOIs",
  formatter: (value, field, spec, context) => {
    const remaining = filterPublications(value, context?.['sci:doi']);
    if (remaining.length === 0) return "";
    const items = remaining.map(item => {
      if (typeof item === 'string') {
        const clean = item.replace(/^https?:\/\/doi\.org\//i, "");
        return `<a href="https://doi.org/${clean}" target="_blank" rel="noopener noreferrer" class="text-secondary small">${clean}</a>`;
      }
      if (typeof item === 'object' && item !== null) {
        const cleanDoi = item.doi ? String(item.doi).replace(/^https?:\/\/doi\.org\//i, "") : null;
        const doiLink = cleanDoi ? `<a href="https://doi.org/${cleanDoi}" target="_blank" rel="noopener noreferrer" class="text-secondary small">${cleanDoi}</a>` : "";
        if (item.citation && cleanDoi) {
          return `<span class="small">${item.citation} (${doiLink})</span>`;
        } else if (item.citation) {
          return `<span class="small">${item.citation}</span>`;
        } else if (cleanDoi) {
          return doiLink;
        }
      }
      return String(item);
    });
    return Helper.toList(items, true, null, false);
  }
});

Registry.fields.links.rel.mapping.vcs = "Version Control System";

// DEFINE FIELDS TO IGNORE IN METADATA RENDERING

/**
 * Function that can be used to change the ignored fields in the metadata rendering.
 * 
 * @type {function|null}
 * @param {STACObject|Object} object The entity for which the metadata is rendered.
 * @param {string[]} fields The fields ignored by default.
 * @param {string} type The type of the entity (e.g. `CatalogLike`, `Item`, `Asset`, `Link`, `Provider`).
 * @returns {string[]} The fields to ignore in the metadata rendering.
 */
const ignoreMetadata = (object, fields, type) => {
  if ((type === 'CatalogLike' || type === 'Item') && object) {
    fields.push('access');
    Object.keys(object).forEach((key) => {
      if (key.startsWith("fair:") || key.startsWith("osc:")) {
        fields.push(key);
      }
    });
    fields.push('themes', 'variables', 'status', 'missions', 'region', 'project');

    // If sci:doi has the same namespace and no citation text, ignore it from the table
    // (since it is already displayed prominently in the header)
    const rawDoi = object['sci:doi'] || object.properties?.['sci:doi'];
    const rawCitation = object['sci:citation'] || object.properties?.['sci:citation'];
    if (rawDoi && isSameNamespace(rawDoi, rawDoi) && !rawCitation) {
      fields.push('sci:doi');
    }

    // If sci:publications has no remaining items after filtering same-namespace items without citation, ignore it
    const rawPubs = object['sci:publications'] || object.properties?.['sci:publications'];
    if (Array.isArray(rawPubs)) {
      const remaining = filterPublications(rawPubs, rawDoi);
      if (remaining.length === 0) {
        fields.push('sci:publications');
      }
    }
  }
  return fields;
};

export { ignoreMetadata };
