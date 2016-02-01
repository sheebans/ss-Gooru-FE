//import DS from "ember-data";
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
   * @property {number} score - Question score
   */
  score: 0,

  /**
   * @property {Object} answer - Answer provided by the user
   */
  userAnswer: null

});

