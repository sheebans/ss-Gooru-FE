import QuestionUtil from './question';
//import AnswerObject from 'gooru-web/utils/question/answer-object';
/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} OpenEndedUtil
 */
export default QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer is correct
   * It overrides the default implementation
   *
   * @param {string} answer user answer
   * @return {boolean}
   */
  isCorrect: function (answer) {
    return !!answer; //if answer exists, OE is not graded right now
  },

  /**
   * Gets the correct answer
   *
   * @return {boolean} the correct answer choice id
   */
  getCorrectAnswer: function () {
    return false; //there is no correct answer for OE
  },

  /**
   * Returns a unique key representing the answer
   * For multiple choice the answer id is already unique
   * @param {string} answer
   * @returns {string}
   */
  answerKey: function (answer) {
    return answer;
  }

});
