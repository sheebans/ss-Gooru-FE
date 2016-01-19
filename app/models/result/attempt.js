import DS from "ember-data";


export default DS.Model.extend({

  user: DS.belongsTo("user/user", {async: true}),

  assessment: DS.belongsTo("collection/collection", {async: true}),

  questionResults: DS.hasMany("result/question", {async: true}),

  learningTargets: DS.hasMany("result/learningTarget", {async: true}),

  submittedOn: DS.attr("date")

});

