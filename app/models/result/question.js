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
  questionId: Ember.computed.alias("resourceId"),

  /**
   * @property {number} score - Question score
   */
  score: 0,

  /**
   * @property {Object} answer - Answer provided by the user
   */
  userAnswer: null,

  /**
   * Indicates if the question was skipped, a result is skipped
   * if it has no answer and correct === false
   * @property {boolean}
   */
  skipped: Ember.computed("correct", "userAnswer", function () {
    return (this.get("correct") === false) && !this.get("answered");
  }),

  /**
   * Indicates if the question is incorrect, a result is incorrect
   * if it has answer and correct === false
   * Important! Skipped results are treated as incorrect as well
   * @property {boolean}
   */
  incorrect: Ember.computed("correct", function(){
    return (this.get("correct") === false);
  }),

  /**
   * A result is started when it has any value at the correct property
   * Not started results are only used by real time and they has not correct value
   * @property {boolean} indicates when it has been started
   */
  started: Ember.computed('correct', function(){
    return this.get("correct") !== null;
  }),

  /**
   * Indicates if it is answered
   * @return {boolean}
   */
  answered: Ember.computed("userAnswer", function(){
    return this.get("userAnswer") !== null && this.get("userAnswer") !== undefined;
  }),

  toJSON: function() {
    return {
      gooruOId: this.get('questionId'),
      score: this.get('score'),
      reaction: this.get('reaction'),
      totalTimespent: this.get('timeSpent'),
      type: 'question',
      questionType: 'MC',
      answerStatus: this.get('correct') ? 'correct' : 'incorrect',
      answerObject: {}
    };
  }

});

