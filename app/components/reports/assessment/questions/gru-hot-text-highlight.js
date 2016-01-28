import Ember from 'ember';
import {HotTextHighlightUtil} from 'gooru-web/utils/questions';
import QuestionMixin from 'gooru-web/mixins/reports/assessment/questions/question';

/**
 * Fill in the blank
 *
 * Component responsible for controlling the logic and appearance of a fill in the blank
 * question inside of the assessment report.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(QuestionMixin, {
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions', 'gru-hot-text-highlight'],

  // -------------------------------------------------------------------------
  // Properties
  answer: Ember.computed("question", function () {
    let component = this;
    let spanClass='isCorrect';
    let question = component.get("question");

    let questionAnswer = question.answers;

    let correctAnswerTextParts = questionAnswer[0].split(" ");
    let regExp = new RegExp('\\[+\\w+\\]');

    if(component.get('showCorrect')){

      correctAnswerTextParts.forEach(function(item,index){
        if(regExp.test(item)){
          item = item.replace('[','<span class='+spanClass+'>');
          item = item.replace(']','</span>');
          correctAnswerTextParts[index]=item;
        }
      });
      return Ember.String.htmlSafe(correctAnswerTextParts.join(" "));
    }else{
      let userAnswers = component.get("userAnswer");
      let userAnswerTextParts= userAnswers[0].split(" ");

      userAnswerTextParts.forEach(function(item, index){
        if(regExp.test(item)){
          if (item === correctAnswerTextParts[index]) {
            spanClass = 'isCorrect';
          }else{
            spanClass= 'isIncorrect'
          }
          item = item.replace('[','<span class='+spanClass+'>');
          item = item.replace(']','</span>');
          userAnswerTextParts[index]=item;
        }
      });
      return Ember.String.htmlSafe(userAnswerTextParts.join(" "));
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Returns the question util for the question
   * @param question
   */
  getQuestionUtil: function(question){
    return HotTextHighlightUtil.create({question: question});
  }
});
