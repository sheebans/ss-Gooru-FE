import DS from "ember-data";

export default DS.Model.extend({

  isFeaturedUser: DS.attr("string"),
  taxonomyPreference: DS.belongsTo("taxonomy-preference", { async: true })

});
