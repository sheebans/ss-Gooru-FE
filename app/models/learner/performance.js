import Ember from 'ember';

/**
 * Learner performance model
 */
const LearnerPerformanceModel = Ember.Object.extend({

  /**
   * @property {String} attemptStatus
   */
  attemptStatus: null,

  /**
   * @property {String} courseId - Gooru id for the course
   */
  courseId: null,

  /**
   * @property {String} courseTitle - course title
   */
  courseTitle: null,

  /**
   * @property {Number} timeSpent - time spent in seconds
   */
  timeSpent: null,

  /**
   * @property {Number} completedCount - completed count
   */
  completedCount: null,

  /**
   * @property {Number} reaction
   */
  reaction:null,

  /**
   * @property {Number} scoreInPercentage - score in percentage
   */
  scoreInPercentage: null,

  /**
   * @property {Number} totalCount - total count
   */
  totalCount: null,

  /**
   * @property {String} collectionId - Gooru id for the collection
   */
  collectionId: null,

  /**
   * @property {String} collectionTitle - collection title
   */
  collectionTitle: null,

  /**
   *  @property {Number} attempts - The number of attempts
   */
  attempts: null

});

export default LearnerPerformanceModel;
