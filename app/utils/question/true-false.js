import Ember from 'ember';
import MultipleChoiceUtil from './multiple-choice';
import AnswerObject from 'gooru-web/utils/question/answer-object';
/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} TrueFalseUtil
 */
export default MultipleChoiceUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Converts the model user answer into an answerObject format
   *
   * For T/F looks like
   *
   * [{"text":"True","status":"correct","order":1,"answerId":1234,"skip":false}]
   *
   * The text could be True or False
   * If not answerId is found it should be 0
   *
   * @param {string} userAnswer answer choice id
   * @return {AnswerObject[]}
   */
  toAnswerObjects: function (userAnswer) {
    let util = this;
    let answer = util.getAnswerById(userAnswer);

    /*
     When no answer is found the userAnswer brings true or false indicating the user selection
     */
    let text = answer ? answer.get("text") : ( (userAnswer) ? "True" : "False" );

    /*
     When no answer if found the answerId should be 0
     */
    let answerId = answer ? userAnswer : 0;

    let answerObject = AnswerObject.create({
      "text": text,
      "correct": util.isCorrect(userAnswer),
      "order": 1,
      "answerId": answerId,
      "skip": false
    });
    return Ember.A([answerObject]);
  },

  /**
   * Converts an answerObject format to model userAnswer
   *
   * For MC looks like
   *
   * For T/F looks like
   *
   * [{"text":"True","status":"correct","order":1,"answerId":1234,"skip":false}]
   *
   * @param {AnswerObject[]} answerObjects
   * @return {string} answer id
   */
  toUserAnswer: function (answerObjects) {
    let userAnswer = null;
    if (answerObjects.get("length")) {
      let answerObject = answerObjects.get("firstObject");
      let text = answerObject.get("text");
      let answerId = answerObject.get("answerId");

      /*
       When answerId = 0, we need to use the text to know the answer selected
       */
      userAnswer = !answerId ? text === "True" : answerId;
    }

    return userAnswer;
  }
});
