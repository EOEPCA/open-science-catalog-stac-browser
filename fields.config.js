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
    // check in value if thema is correct (themes)
  });

Registry.addMetadataField('contacts', {
    label: "Contacts",
    ext: "osc",
});

Registry.addMetadataField('osc:project', {
  label: "Project",
  ext: "osc",
  formatter: value => Helper.toLink(`/stac-browser/#/projects/${value}/collection.json`, value)
});

Registry.addMetadataField('osc:themes', {
  label: "Themes",
  ext: "osc",
  formatter: value =>
    value.map(theme => Helper.toLink(`/stac-browser/#/themes/${theme}/catalog.json`, theme)).join(", ")
});

Registry.addMetadataField('osc:variables', {
  label: "Variables",
  ext: "osc",
  formatter: value =>
    value.map(variable => Helper.toLink(`/stac-browser/#/variables/${variable}/catalog.json`, variable)).join(", ")
});

Registry.addMetadataField('osc:missions', {
  label: "Missions",
  ext: "osc",
  formatter: value =>
    value.map(mission => Helper.toLink(`/stac-browser/#/eo-missions/${mission}/catalog.json`, mission)).join(", ")
});