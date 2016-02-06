import Ember from "ember";

/**
 * Model for a group of questions that were answered by a user.
 *
 * @typedef {Object} UserQuestionsResult
 *
 */
export default Ember.Object.extend({

  /**
   * @property {QuestionResult[]} questionsResults
   */
  questionsResults: [],

  /**
   * @property {string} user
   */
  user: null

});
