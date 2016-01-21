import Ember from "ember";

/**
 * Model for a brief summary of the status of a question after it was answered by a user.
 *
 * @typedef {Object} QuestionResult
 *
 */
export default Ember.Object.extend({

  /**
   * @property {boolean} correct - Was the answer provided for this question correct?
   */
  correct: false,

  /**
   * @property {number} questionId - ID of the question graded
   */
  questionId: null,

  /**
   * @property {number} reaction - Value of the reaction the user had towards the question
   */
  reaction: 0,

  /**
   * @property {number} score - Question score
   */
  score: 0,

  /**
   * @property {number} timeSpent - Time in seconds that it took the user to answer the question
   */
  timeSpent: 0

});

