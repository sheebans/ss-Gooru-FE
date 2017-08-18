import Ember from 'ember';
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
  categoriesScore: [],

  /**
   * All grades scores
   * @property {Array} scores
   */
  scores: Ember.computed.map('categoriesScore.@each.levelScore', function(
    item
  ) {
    return +(item.get('levelScore') || 0);
  }),

  /**
   * Sum of all scores
   * @property {Integer} currentScore
   */
  currentScore: Ember.computed.sum('scores'),

  /**
   * If any category has scores
   * @property {Boolean}
   */
  hasScore: Ember.computed('categoriesScore.@each.levelScore', function() {
    return this.get('categoriesScore').reduce(
      (hasScore, score) => hasScore || score.get('hasScore'),
      false
    );
  })
});
