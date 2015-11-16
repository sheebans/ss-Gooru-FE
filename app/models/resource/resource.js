import DS from 'ember-data';

export default DS.Model.extend({

  gooruOid: DS.attr('string'),
  collectionItemId: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  itemSequence: DS.attr('number'),
  resourceType: DS.attr('number'),
  resourceFormat: DS.attr('string')

});
