import Ember from 'ember';
/**
 * @module
 * @typedef {Object} PlayerController
 *
 * @augments Ember/Controller
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['resourceId', 'role', 'type', 'sourceId'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Query param
   * @property {string} resourceId
   */
  resourceId: null,

  /**
   * Indicates the user's role, could be 'student', 'teacher' or null
   * This property is not used for the context-player
   * @property {string}
   */
  role: null,

  /**
   * Query param
   * @property {string} sourceId
   */
  sourceId: null,

  /**
   * Query param indicating if it is a collection or assessment
   * @property {string}
   */
  type: null
});
