import Ember from "ember";
import ResourceResult from 'gooru-web/models/result/resource';

/**
 * Model for a brief summary of the status of a question after it was answered by a user.
 *
 * @typedef {Object} QuestionResult
 *
 */
export default ResourceResult.extend({

  /**
   * @property {boolean} correct - Was the answer provided for this question correct?
   */
  correct: false,

  /**
   * @property {Object} question
   */
  question: Ember.computed.alias('resource'),

  /**
   * Sometimes the question is not resolved and only the id is provided
   * This is used mostly by the real time
   * @property {number} questionId - ID of the question graded
   */
  questionId: null,

  /**
   * @property {number} score - Question score
   */
  score: 0,

  /**
   * @property {Object} answer - Answer provided by the user
   */
  userAnswer: null


});

