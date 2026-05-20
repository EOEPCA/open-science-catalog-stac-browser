import { Registry, Helper } from '@radiantearth/stac-fields';

// Please consult https://github.com/radiantearth/stac-browser/blob/main/README.md#additional-metadata-fields for details.

// Registry.addExtension('radiant', 'Radiant Earth');
// Registry.addMetadataField('radiant:public_access', {
//     label: "Data Access",
//     formatter: value => value ? "Public" : "Private"
// });

Registry.addExtension('osc', 'Open Science Catalog');

Registry.addMetadataField('themes', {
    label: "Themes",
    ext: "osc", 
    formatter: value => Helper.toList(value.find(v => v.scheme === "OSC:SCHEME:THEMES").concepts, true, (i) => i.id, false)
  });

Registry.addMetadataField('contacts', {
    label: "Contacts",
    ext: "osc",
});

const formatLink = (type, value, links, jsonName) => {
  const link = links.find(link => link.rel === 'related' && link.href.includes(value));
  return Helper.toLink(`/stac-browser/#/${type}/${value}/${jsonName}.json`, link.title.split(":")[1], "", "_self");
}

Registry.addMetadataField('osc:project', {
  label: "Project",
  ext: "osc",
  formatter: (value, field, spec, { links }) => {
    return formatLink("projects", value, links, "collection")
  }
});

Registry.addMetadataField('osc:themes', {
  label: "Themes",
  ext: "osc",
  formatter: (value, field, spec, { links }) =>
    value.map(theme => formatLink("themes", theme, links, "catalog")).join(", ")
});

Registry.addMetadataField('osc:variables', {
  label: "Variables",
  ext: "osc",
  formatter: (value, field, spec, { links }) =>
    value.map(variable => formatLink("variables", variable, links, "catalog")).join(", ")
});

Registry.addMetadataField('osc:missions', {
  label: "Missions",
  ext: "osc",
  formatter: (value, field, spec, { links }) =>
    value.map(mission => formatLink("eo-missions", mission, links, "catalog")).join(", ")
});

Registry.fields.links.rel.mapping.vcs = "Version Control System";
// DEFINE FIELDS TO IGNORE IN METADATA RENDERING

/**
 * Function that can be used to change the ignored fields in the metadata rendering.
 * 
 * @param {STACObject|Object} object The entity for which the metadata is rendered.
 * @param {string[]} fields The fields ignored by default.
 * @param {string} type The type of the entity (e.g. `CatalogLike`, `Item`, `Asset`, `Link`, `Provider`).
 * @returns {string[]} The fields to ignore in the metadata rendering.
 */
const ignoreMetadata = (object, fields, type) => {
  if (type === 'CatalogLike' && object) {
    fields.push('access');
    Object.keys(object).forEach((key) => {
      if (key.startsWith("fair:")) {
        fields.push(key);
      }
    });
  }
  return fields;
};

export { ignoreMetadata };
