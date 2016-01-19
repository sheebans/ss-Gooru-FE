import DS from "ember-data";


export default DS.Model.extend({

  attempt: DS.belongsTo("result/attempt", {async: true}),

  question: DS.belongsTo("resource/resource", {async: true}),

  user: DS.belongsTo("user/user", {async: true}),

  correct: DS.attr('boolean'),

  reaction: DS.attr('number'),

  timeSpent: DS.attr('number')

});

