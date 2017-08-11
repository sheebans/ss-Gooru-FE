import Ember from 'ember';

/**
 * @typedef {object} Grading Player Controller
 */
export default Ember.Controller.extend({
  queryParams: [
    'classId',
    'courseId',
    'unitId',
    'lessonId',
    'collectionId',
    'questionId'
  ],

  actions: {
    /**
     * Open student roster
     */
    openStudentRoster: function() {
      this.set('showRoster', true);
    },
    /**
     * Close student roster
     */
    closeRoster: function() {
      this.set('showRoster', false);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * The class id
   * @property {String} classId
   */
  classId: null,

  /**
   * The course id
   * @property {String} courseId
   */
  courseId: null,

  /**
   * The unit id
   * @property {String} unitId
   */
  unitId: null,

  /**
   * The lesson id
   * @property {String} lessonId
   */
  lessonId: null,

  /**
   * The collection id
   * @property {String} collectionId
   */
  collectionId: null,

  /**
   * The question id
   * @property {String} questionId
   */
  questionId: null,

  /**
   * Current student id
   * @property {String} studentId
   */
  studentId: null,

  /**
   * If the response should be hidden
   * @property {Boolean} hideResponse
   */
  hideResponse: false,
  /**
   * If the student roster should be hidden
   * @property {Boolean} showRoster
   */
  showRoster: false
});
