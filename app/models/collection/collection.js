import DS from 'ember-data';

export default DS.Model.extend({

  gooruOid: DS.attr('string'),
  collectionType: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  imageUrl: DS.attr('string'),
  resourceCount: DS.attr('number'),
  questionCount: DS.attr('number'),
  collectionItems: DS.hasMany('collection/resource'),

});
