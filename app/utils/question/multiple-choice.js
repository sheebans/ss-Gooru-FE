import Ember from 'ember';
import QuestionUtil from './question';
import AnswerObject from 'gooru-web/utils/question/answer-object';
/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleChoiceUtil
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
    return this.isAnswerChoiceCorrect(answer);
  },

  /**
   * Indicates if the answer choice is correct
   * @param { * } answerChoice
   */
  isAnswerChoiceCorrect: function (answerChoice) {
    return this.getCorrectAnswer() === answerChoice;
  },

  /**
   * Gets the correct answer
   *
   * @return {string} the correct answer choice id
   */
  getCorrectAnswer: function () {
    const answers = this.get("question.answers");
    const correctAnswer = answers.filterBy("isCorrect", true);
    return correctAnswer.get("length") ? correctAnswer.get("firstObject.id") : undefined;
  },

  /**
   * Returns a unique key representing the answer
   * For multiple choice the answer id is already unique
   * @param {number} answer i.e 1
   * @returns {number} i.e 1
   */
  answerKey: function (answer) {
    return answer;
  },

  /**
   * Converts the model user answer into an answerObject format
   *
   * For MC looks like
   *
   * [{"text":"Apple","status":"correct","order":1,"answerId":1234,"skip":false}]
   *
   * @param {string} userAnswer answer choice id
   * @return {AnswerObject[]}
   */
  toAnswerObjects: function (userAnswer) {
    let util = this;
    let answer = util.getAnswerById(userAnswer);
    let answerObject = AnswerObject.create({
      "text": answer.get("text"),
      "correct": util.isCorrect(userAnswer),
      "order": 1,
      "answerId": userAnswer,
      "skip": false
    });
    return Ember.A([answerObject]);
  },

  /**
   * Converts an answerObject format to model userAnswer
   *
   * For MC looks like
   *
   * [{"text":"Apple","status":"correct","order":1,"answerId":1234,"skip":false}]
   *
   * @param {AnswerObject[]} answerObjects
   * @return {string} answer id
   */
  toUserAnswer: function (answerObjects) {
    let userAnswer = null;
    if (answerObjects.get("length")) {
      let answerObject = answerObjects.get("firstObject");
      userAnswer = answerObject.get("answerId");
    }

    return userAnswer;
  }


});
