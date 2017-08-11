import Ember from 'ember';

/**
 * @typedef {object} Grading Player Controller
 */
export default Ember.Controller.extend({
  queryParams: [
    'studentId',
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
