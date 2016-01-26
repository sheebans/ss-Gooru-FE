import Ember from 'ember';
import {MultipleAnswerUtil} from 'gooru-web/utils/questions';
import QuestionMixin from 'gooru-web/mixins/reports/assessment/questions/question';

/**
 * Multiple answer
 *
 * Component responsible for show the multiple answer, what option are selected
 * and the correct option.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(QuestionMixin, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions', 'gru-multiple-answer'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  answers: Ember.computed("question", function () {
    let component = this;
    let question = component.get("question");
    let questionUtil = component.getQuestionUtil(question);
    let userAnswers = component.get("userAnswer");
   // console.log('userAnswer1', userAnswers);
    if (component.get("showCorrect")){
      userAnswers = questionUtil.getCorrectAnswer();
      //console.log('userAnswer2', userAnswers);
    }

     return userAnswers.map(function(userAnswer) {
      //console.log('userAnswer', userAnswer);
      let userAnswerCorrect = questionUtil.isAnswerChoiceCorrect(userAnswer);
      console.log('userAnswerCorrect', userAnswerCorrect);
      return {
        text: 'sd',
        selected: 's',
        correct: userAnswerCorrect
      };

    });

    //return {
    //        text: 'sd',
    //        selected: 's',
    //        correct: userAnswerCorrect
    //      };
    //return answers.map(function(answer){
    //  let userAnswerCorrect = questionUtil.isAnswerChoiceCorrect(userAnswer);
    //  return {
    //    text: answer.get("text"),
    //    selected: answer.get("id") === userAnswer,
    //    correct: userAnswerCorrect
    //  };
    //});
  }),

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Returns the question util for the question
   * @param question
   */
  getQuestionUtil: function(question){
    return MultipleAnswerUtil.create({question: question});
  }


});
