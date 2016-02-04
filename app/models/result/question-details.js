import Ember from 'ember';
import ResourceResult from 'gooru-web/models/result/resource';

/**
 * Model for the status of a question after it was answered by a user.
 * It includes the information of the question.
 *
 * @typedef {Object} QuestionDetailsResult
 *
 */
export default ResourceResult.extend({

  /**
   * @property {boolean} correct - Was the answer provided by the user correct?
   */
  correct: false,

  /**
   * @property {Object} question
   */
  question: Ember.computed.alias('resource'),

  /**
   * @property {number} score - Question score
   */
  score: 0,

  /**
   * @property {Object} answer - Answer provided by the user
   */
  userAnswer: null

});

