import Ember from 'ember';
import {FillInTheBlankUtil} from 'gooru-web/utils/questions';

/**
 * Multiple choice
 *
 * Component responsible for controlling the logic and appearance of a fill in the blank
 * question inside of the assessment report.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions', 'gru-fib'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Question information
   * @property {Resource} question
   */
  question: null,

  /**
   * @property {Array} user answer
   */
  userAnswer: null,

  /**
   * @property {boolean} indicates if it should display the correct question answer
   */
  showCorrect: false,

  answer: Ember.computed("question", function () {
    let component = this;
    let question = component.get("question");
    let questionUtil = FillInTheBlankUtil.create({question: question});
    let questionText = question.text;
    let questionTextParts = questionText.split("_______");
    let userAnswers = component.get("userAnswer");

    if (component.get("showCorrect")){
      userAnswers = questionUtil.getCorrectAnswer();
    }

    let answers= userAnswers.map(function(userAnswer, index){
      let userAnswerCorrect = questionUtil.isAnswerChoiceCorrect(userAnswer, index);
      return {
        text: userAnswer,
        class: (userAnswerCorrect)?'answer correct':'answer incorrect'
      };
    });

    let sentences= questionTextParts.map(function(questionTextPart){
      return {
        text: questionTextPart,
        class: 'sentence'
      };
    });

    return this.mergeArrays (sentences, answers);
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Merge sentences and answers arrays
   * @return {Array}
   */
  mergeArrays: function(sentences, answers){
    answers.forEach(function(item, index){ sentences.insertAt((index*2)+1, item); });
    return sentences;
  }

});
