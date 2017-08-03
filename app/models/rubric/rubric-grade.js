import Rubric from 'gooru-web/models/rubric/rubric';

/**
 * Rubric Grade model
 * typedef {Object} RubricGrade
 */
export default Rubric.extend({
  /**
   * @property {string} eventName to create a rubric grade
   */
  eventName: 'resource.rubric.grade',

  /**
   * @property {String} studentId
   */
  studentId: null,

  /**
   * @property {String} classId
   */
  classId: null,

  /**
   * @property {String} sessionId
   */
  sessionId: null,

  /**
   * @property {String} resourceId
   */
  resourceId: null,

  /**
   * @property {Integer} Learner score for the grade
   */
  learnerScore: null,

  /**
   * @property {String} comment
   */
  comment: '',

  /**
   * @property {gradeCategoryScore[]}
   */
  categoriesScore: []
});
