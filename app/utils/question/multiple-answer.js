import Ember from 'ember';
import QuestionUtil from './question';
import AnswerObject from 'gooru-web/utils/question/answer-object';
/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleAnswerUtil
 */
export default QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { { id: number, selection: boolean } } answerChoice
   */
  isAnswerChoiceCorrect: function (answerChoice) {
    let correctAnswer = this.getCorrectAnswer();
    let found = correctAnswer.filterBy("id", answerChoice.id);
    return found.get("length") && found.get("firstObject.selection") === answerChoice.selection;
  },

  /**
   * Gets the correct answer
   * It returns which is the correct selection (yes=true | no=false) for each answer choice
   * @return {Array} the correct answer for this question type [ { id: string, selection: boolean }, ... ]
   */
  getCorrectAnswer: function () {
    const answers = this.get("question.answers");
    return answers.map(function (answer) {
      return {id: answer.get("id"), selection: answer.get("isCorrect")};
    });
  },

  /**
   * Returns a unique key representing the answer
   * For multiple answer the answer is an array of { id: number, selection: boolean }
   * @param { { id: number, selection: boolean }[] } answer
   * @returns {string} i.e id_true,id_false,id_true
   */
  answerKey: function (answer) {
    let keys = Ember.A(answer).sortBy('id').map(function (item) {
      return item.id + "_" + item.selection;
    });
    return keys.toArray().join();
  },

  /**
   * Converts the model user answer into an answerObject format
   *
   * For MA looks like
   *
   *  [{"text":"Yes","status":"correct","order":1,"answerId":1234,"skip":false},
   *  {"text":"Yes","status":"incorrect","order":2,"answerId":1234,"skip":false},
   *  {"text":"No","status":"incorrect","order":3,"answerId":"1234,"skip":false},
   *  {"text":"No","status":"correct","order":4,"answerId":1235,"skip":false}]
   *
   * @param { { id: string, selection: boolean }[] } userAnswer
   * @return {AnswerObject[]}
   */
  toAnswerObjects: function (userAnswer) {
    let util = this;
    return userAnswer.map(function (item, index) {
      let answer = util.getAnswerById(item.id);
      let text = item.selection ? "Yes" : "No";
      return AnswerObject.create({
        "text": text,
        "correct": util.isAnswerChoiceCorrect(item),
        "order": index + 1,
        "answerId": answer.get("id"),
        "skip": false
      });
    });
  },

  /**
   * Converts an answerObject format to model userAnswer
   *
   * For MA looks like
   *
   *  [{"text":"Yes","status":"correct","order":1,"answerId":1234,"skip":false},
   *  {"text":"Yes","status":"incorrect","order":2,"answerId":1234,"skip":false},
   *  {"text":"No","status":"incorrect","order":3,"answerId":"1234,"skip":false},
   *  {"text":"No","status":"correct","order":4,"answerId":1235,"skip":false}]
   *
   * @param {AnswerObject[]} answerObjects
   * @return { { id: string, selection: boolean }[] } answer selections
   */
  toUserAnswer: function (answerObjects) {
    return answerObjects.map(function (answerObject) {
      return {id: answerObject.get("answerId"), selection: answerObject.get("text") === "Yes"};
    });
  }


});

