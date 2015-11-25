import DS from 'ember-data';

/**
 * Model that contains the class information
 */
export default DS.Model.extend({

  /**
   * @property {string} Student/Teacher name
   */
  name: DS.attr('string'),

  /**
   * @property {string} Class Code
   */
  code: DS.attr('string'),

  /**
   * @property {string} Grades values separated by commas, e.g. 'K,1,2,3'
   */
  grades: DS.attr('string'),

  /**
   * @property {string} Visibility (true/false)
   */
  visibility: DS.attr('boolean'),

  /**
   * @property {string} Total members joined to the class
   */
  totalMembers: DS.attr('number'),

  /**
   * @property {Object} Basic teacher information (id, username, avatarUrl)
   */
  teacher: DS.attr()

});
