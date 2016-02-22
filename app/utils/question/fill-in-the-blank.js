import AnswerObject from 'gooru-web/utils/question/answer-object';
import QuestionUtil from './question';

/**
 * It contains convenience methods for grading and retrieving useful information
 * for Fill in the bLank
 *
 * # Answer object (structure required by the BE)
 *  It is an array containing a json object for each input in the question
 *
 *  text contains the text entered in the specific input
 *  status could have correct or incorrect based on the text entered
 *  order contains the input index, is starts at 1
 *  answerId contains a reference to the question answer id
 *  skip is always false
 *
 * [{"text":"actions","status":"incorrect","order":1,"answerId":1234,"skip":false},
 *  {"text":"object","status":"incorrect","order":2,"answerId":1235,"skip":false}]
 *
 * # User answer (structure used by the FE)
 *  It is an array containing all the text entered by the user,
 *  If an input was left blank, it is still added to this array
 *  The order of the texts in the array mean the input it was filled for
 *
 *  ['black', '', 'blue']
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
   *
   * @see '# User Answer' section at class comment
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

   * @param { string[] } answer
   * @returns { string }
   *
   * @see '# User Answer' section at class comment
   * @see '# Answer Object' section at class comment
   */
  answerKey: function (answer) {
    return answer.join();
  },

  /**
   * Converts the model user answer into an answerObject format
   **
   * @param { string[] } userAnswer
   * @return {AnswerObject[]}
   *
   * @see '# User Answer' section at class comment
   * @see '# Answer Object' section at class comment
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
   * @param {AnswerObject[]} answerObjects
   * @return {string[]} answer texts
   *
   * @see '# User Answer' section at class comment
   * @see '# Answer Object' section at class comment
   */
  toUserAnswer: function (answerObjects) {
    answerObjects = answerObjects.sortBy("order");
    return answerObjects.map(function (answerObject) {
      return answerObject.get("text");
    });
  }

});
