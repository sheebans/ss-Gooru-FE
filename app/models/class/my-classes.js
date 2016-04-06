import Ember from 'ember';

/**
 * My Classes model
 *
 * @typedef {Object} MyClassesModel
 */
export default Ember.Object.extend({
  /**
   * @property {string[]} List of classes where the user is owner
   */
  ownerList: [],

  /**
   * @property {string[]} List of classes where the user is collaborator
   */
  collaboratorList: [],

  /**
   * @property {string[]} List of classes where the user is member
   */
  memberList: [],

  /**
   * @property {Object} List of key values containing class id and student count
   */
  memberCount: null,

  /**
   * @property {class-details[]} Detailed list of classes
   */
  classes: []
});