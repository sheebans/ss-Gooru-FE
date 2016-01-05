import DS from 'ember-data';

/**
 * Model to represent the course's data
 */
export default DS.Model.extend({

  /**
   * @property {string} title
   */
  title: DS.attr('string'),

  /**
   * Count of total units assign to the course
   * @property {number} totalUnits
   */
  totalUnits: DS.attr("number"),

  /**
   * @property {string} subject
   */
  subject: DS.attr('string'),

  /**
   * @property {string} Course image url
   */
  imageUrl: DS.attr('string'),

  /**
   * @property {Array} list of users who have remix the course
   */
  remixedBy: DS.hasMany('user/user'),


});
