import MultipleAnswerUtil from './multiple-answer';
//import AnswerObject from 'gooru-web/utils/question/answer-object';
/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} HotSpotImageUtil
 */
export default MultipleAnswerUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   */
  isAnswerChoiceCorrect: function (answerChoice) {
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice);
  },

  /**
   * Gets the correct answer
   * @return {string[]} returns the correct answer choice ids
   */
  getCorrectAnswer: function () {
    let answers = this.get("question.answers");
    let correctAnswers = answers.filterBy("isCorrect", true);
    return correctAnswers.map(function (answer) {
      return answer.get("id");
    });
  },

  /**
   * Returns a unique key representing the answer
   * For hot spot image the answer is an array of ids
   * @param { string[] } answer
   * @returns {string} i.e id1,id2,id3
   */
  answerKey: function (answer) {
    return answer.sort().join();
  }


});
