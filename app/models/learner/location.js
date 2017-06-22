import Ember from 'ember';

/**
 * Learner location model
 *
 * @typedef {Object} Goal
 */
const LearnerLocationModel = Ember.Object.extend({
  /**
   * @property {String} collectionId - Gooru id for the collection
   */
  collectionId: null,

  /**
   * @property {String} courseId - Gooru id for the course
   */
  courseId: null,

  /**
   * @property {String} lessonId - Gooru id for the lesson
   */
  lessonId: null,

  /**
   * @property {String} unitId - Gooru id for the unit
   */
  unitId: null,

  /**
   * @property {Boolean} isCompleted - if the content has been completed
   */
  isCompleted: Ember.computed.equal('status', 'complete'),

  /**
   * @property {Date} lastAccessed - last date the content was accessed
   */
  lastAccessed: null,

  /**
   * @property {String} title - content title
   */
  title: null,

  /**
   * @property {String} type - one of course, assessment or collection
   */
  type: null
});

export default LearnerLocationModel;
