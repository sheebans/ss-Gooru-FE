import DS from 'ember-data';

/**
 * @module
 * @typedef {Object} Resource
 */
export default DS.Model.extend({

  /**
   * @property {string} Resource's name
   */
  name: DS.attr('string'),
  /**
   * @property {string} Resource's image url
   */
  imageUrl: DS.attr('string'),
  /**
   * @property {string} Resource's type
   */
  type: DS.attr('string')

});
