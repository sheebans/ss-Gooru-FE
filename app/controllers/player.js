import PlayerController from 'quizzes-addon/controllers/player';

/**
 * @module
 * @typedef {Object} PlayerController
 *
 * @augments Ember/Controller
 */
export default PlayerController.extend({

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
   * Query param indicating if it is a collection or assessment
   * @property {string}
   */
  type: null
});
