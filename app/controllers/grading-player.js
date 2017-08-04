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

  // -------------------------------------------------------------------------
  // Properties

  /**
   * If the response should be hidden
   * @property {Boolean} hideResponse
   */
  hideResponse: false
});
