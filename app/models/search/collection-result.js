import DS from 'ember-data';

export default DS.Model.extend({

  /**
   * @property {number} Search's result number of hits
   */
  totalHitCount: DS.attr('number'),
  /**
   * @property {array} Search's result of collections
   */
  collections: DS.hasMany("search/collection")

});
