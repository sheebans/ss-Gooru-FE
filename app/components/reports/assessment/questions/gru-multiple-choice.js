import Ember from 'ember';
import {MultipleChoiceUtil} from 'gooru-web/utils/questions';

/**
 * Multiple choice
 *
 * Component responsible for show the multiple choice answer, what option are selected
 * and the correct option.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions', 'gru-multiple-choice'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Question information
   * @property {Resource} question
   */
  question: null,

  /**
   * @property {string} selected user answer, it is the answer choice id
   */
  userAnswer: null,

  /**
   * @property {boolean} indicates if it should display the correct question answer
   */
  showCorrect: false,


  answers: Ember.computed("question", function () {
    let component = this;
    let question = component.get("question");
    let questionUtil = MultipleChoiceUtil.create({question: question});
    let userAnswer = component.get("userAnswer");
    if (component.get("showCorrect")){
      userAnswer = questionUtil.getCorrectAnswer();
    }

    let userAnswerCorrect = questionUtil.isAnswerChoiceCorrect(userAnswer);
    let answers = question.answers;
    return answers.map(function(answer){
      return {
        text: answer.get("text"),
        selected: answer.get("id") === userAnswer,
        correct: userAnswerCorrect
      };
    });
  })

});
