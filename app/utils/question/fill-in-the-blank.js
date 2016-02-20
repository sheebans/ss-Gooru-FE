import AnswerObject from 'gooru-web/utils/question/answer-object';
import QuestionUtil from './question';

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} FillInTheBlankUtil
 */
export default QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   * @param { number } index position of the answer
   */
  isAnswerChoiceCorrect: function (answerChoice, index) {
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice) &&
      correctAnswer.indexOf(answerChoice) === index;
  },

  /**
   * Gets the correct answer
   * @return {string[]} the correct answer for this question type
   */
  getCorrectAnswer: function () {
    const answers = this.get("question.answers");
    return answers.map(function (answer) {
      return answer.get("text");
    });
  },

  /**
   * Returns a unique key representing the answer
   * For FIB the answer is an array of strings
   * @param { string[] } answer i.e ['black', 'white', 'blue']
   * @returns { string }
   */
  answerKey: function (answer) {
    return answer.join();
  },

  /**
   * Converts the model user answer into an answerObject format
   *
   * For FIB looks like
   *
   * [{"text":"actions","status":"incorrect","order":1,"answerId":1234,"skip":false},
   *  {"text":"object","status":"incorrect","order":2,"answerId":1235,"skip":false}]
   *
   * @param { string[] } userAnswer i.e ['black', 'white', 'blue']
   * @return {AnswerObject[]}
   */
  toAnswerObjects: function (userAnswer) {
    let util = this;
    return userAnswer.map(function (text, index) {
      let answer = util.getAnswerByText(text);
      return AnswerObject.create({
        "text": text,
        "correct": util.isAnswerChoiceCorrect(text, index),
        "order": index + 1,
        "answerId": answer ? answer.get("id") : 0,
        "skip": false
      });
    });
  },

  /**
   * Converts an answerObject format to model userAnswer
   *
   * For FIB looks like
   *
   * [{"text":"actions","status":"incorrect","order":1,"answerId":1234,"skip":false},
   *  {"text":"object","status":"incorrect","order":2,"answerId":1235,"skip":false}]
   *
   * @param {AnswerObject[]} answerObjects
   * @return {string[]} answer texts i.e ['black', 'white', 'blue']
   */
  toUserAnswer: function (answerObjects) {
    answerObjects = answerObjects.sortBy("order");
    return answerObjects.map(function (answerObject) {
      return answerObject.get("text");
    });
  }

});
