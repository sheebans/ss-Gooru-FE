//import DS from "ember-data";
import Ember from "ember";

/**
 * Model for the status of a question after it was answered by a user.
 * It includes the information of the question.
 *
 * @typedef {Object} QuestionResultDetails
 *
 */
export default Ember.Object.extend({

  /**
   * @property {boolean} correct - Was the answer provided by the user correct?
   */
  correct: false,

  /**
   * @property {Object} question
   */

  question: {

    /**
     * @property {string} questionType
     * @example
     * 'MC', 'MA'
     */
    questionType: null,

    /**
     * @property {string} text - Question text
     */
    text: '',

    /**
     * @property {string[]} hints - Hints for the question
     */
    hints: [],

    /**
     * @property {string} explanation - Explanation for the question
     */
    explanation: '',

    /**
     * @property {Object[]} answers - Answer choices for the question
     */
    answers: [],

    /**
     * @property {boolean} order - What is the position of the question in the assessment?
     */
    order: 0

  },

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
  timeSpent: 0,

  /**
   * @property {Object} answer - Answer provided by the user
   */
  userAnswer: null

});

