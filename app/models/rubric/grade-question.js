import Ember from 'ember';

/**
 * Grade Question model
 *
 * @typedef {Object} Grade Question
 */
export default Ember.Object.extend({
  /**
   * @property {String} classId
   */
  classId: null,

  /**
   * @property {String} courseId
   */
  courseId: null,

  /**
   * @property {String} userId
   */
  userId: null,

  /**
   * @property {gradeQuestionItem[]}
   */
  gradeItems: []
});
