import DS from "ember-data";

export default DS.Model.extend({

  profileId: DS.attr("string"),
  aboutMe: DS.attr("string"),
  user: DS.belongsTo("user", { async: true })

});
