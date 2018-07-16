import QuizzesPlayerController from 'quizzes-addon/controllers/player';

/**
 * @module
 * @typedef {Object} PlayerController
 *
 * @augments Ember/Controller
 */
export default QuizzesPlayerController.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: [
    'resourceId',
    'role',
    'type',
    'sourceId',
    'source',
    'classId',
    'isStudyPlayer'
  ],

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
   * Indicates the component of the application that is originating the events
   * @property {String} source
   */
  source: null,

  /**
   * Query param indicating if it is a collection or assessment
   * @property {string}
   */
  type: null,

  /**
   * @property {Boolean}
   * Property to find out whether study-player rendered or not
   */
  isStudyPlayer: false,

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Resets to default values
   */
  resetValues: function() {
    this.setProperties({
      role: null,
      source: null,
      sourceId: null,
      resourceId: null,
      type: null
    });
  }
});
