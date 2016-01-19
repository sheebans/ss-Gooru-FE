import DS from "ember-data";


export default DS.Model.extend({

  standard: DS.attr("string"),

  text: DS.attr("string"),

  relatedQuestions: DS.hasMany("result/question", {async: true}),

  suggestedResources: DS.hasMany("resource/resource", {async: true})

});

