import DS from 'ember-data';

/**
 * Model to represent the course's data
 */
export default DS.Model.extend({

  /**
   * @property {string} title
   */
  title: DS.attr('string')

});
