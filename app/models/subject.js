import DS from "ember-data";

export default DS.Model.extend({

  libraryId: DS.attr("number"),
  library: DS.attr("string"),
  label: DS.attr("string"),
  subjectCode: DS.attr("string"),

});


