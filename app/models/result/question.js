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
  correct: null,

  /**
   * @property {Object} question
   */
  question: Ember.computed.alias('resource'),

  /**
   * Sometimes the question is not resolved and only the id is provided
   * This is used mostly by the real time
   * TODO once the SDK is integrated we could analyze if is possible to use only 'question'
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
  userAnswer: null,

  /**
   * Indicates if the question was skipped
   * @property {boolean}
   */
  skipped: Ember.computed("userAnswer", "notStarted", function(){
    let started = !this.get("notStarted");
    return started && !this.get("userAnswer");
  }),

  /**
   * Indicates if the question is incorrect
   * @property {boolean}
   */
  incorrect: Ember.computed.equal("correct", false),

  /**
   * @property {boolean} indicates when it has not been started
   */
  notStarted: false


});

