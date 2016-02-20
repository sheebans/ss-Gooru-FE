import QuestionUtil from './question';
import AnswerObject from 'gooru-web/utils/question/answer-object';
/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} ReorderUtil
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
   * @return {string[]} returns the correct order for answer choice ids
   */
  getCorrectAnswer: function () {
    const answers = this.get("question.answers").sortBy("order");
    return answers.map(function (answer) {
      return answer.get("id");
    });
  },

  /**
   * Returns a unique key representing the answer
   * For Roerder the answer is an array of answer ids
   * @param { string[] } answer i.e ['answerId_1', 'answerId_2', 'answerId_3']
   * @returns { string }
   */
  answerKey: function (answer) {
    return answer.join();
  },

  /**
   * Converts the model user answer into an answerObject format
   *
   * For Reorder looks like
   *
   * [{"text":"1","status":"correct","order":1,"answerId":1234,"skip":false},
   * {"text":"2","status":"correct","order":3,"answerId":1234,"skip":false},
   * {"text":"3","status":"correct","order":2,"answerId":1234,"skip":false}]
   *
   * @param { string[] } userAnswer answer ids in selected order
   * @return {AnswerObject[]}
   */
  toAnswerObjects: function (userAnswer) {
    let util = this;
    return userAnswer.map(function (answerId, index) {
      let answer = util.getAnswerById(answerId);
      return AnswerObject.create({
        "text": answer.get("text"),
        "correct": util.isAnswerChoiceCorrect(answerId, index),
        "order": index + 1,
        "answerId": answerId,
        "skip": false
      });
    });
  },

  /**
   * Converts an answerObject format to model userAnswer
   *
   * For Reorder looks like
   *
   * [{"text":"1","status":"correct","order":1,"answerId":1234,"skip":false},
   * {"text":"2","status":"correct","order":3,"answerId":1234,"skip":false},
   * {"text":"3","status":"correct","order":2,"answerId":1234,"skip":false}]
   *
   * @param {AnswerObject[]} answerObjects
   * @return {string[]} answer ids in selected order
   */
  toUserAnswer: function (answerObjects) {
    answerObjects = answerObjects.sortBy("order");
    return answerObjects.map(function (answerObject) {
      return answerObject.get("answerId");
    });
  }

});
