import DS from "ember-data";


export default DS.Model.extend({
  
  confirmStatus: DS.attr("number"),
  collaboratorCheck: DS.attr("boolean"),
  availability: DS.attr("boolean")
  
});

