import Ember from 'ember';
/**
 * User model
 *
 * @typedef {Object} Content/User
 */
export default Ember.Object.extend({

  /**
   * @property {String} id - Gooru id for the unit
   */
  id: null,

  /**
   * @property {String} username
   */
  username: null,

  /**
   * @property {String} first name
   */
  firstName: null,

  /**
   * @property {String} last name
   */
  lastName: null,

  /**
   * @property {String} avatarUrl
   */
  avatarUrl: null

});
