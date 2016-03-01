import Ember from 'ember';
import QuestionComponent from './gru-question';

/**
 * Fill in the blank
 *
 * Component responsible for controlling the logic and appearance of a fill in the blank
 * question inside of the {@link player/gru-question-viewer.js}
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-question-viewer.js
 * @augments Ember/Component
 */
export default QuestionComponent.extend({
// -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-fib'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events
  initInputEvents: function () {
    const component = this;
    component.setAnswers();
  }.on('didInsertElement'),

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Replace "_______" to an input
   * @param question
   *
   */
  answers: Ember.computed('question.text', function () {
    const component = this;
    let answers = component.get("question.text");
    let readOnly = component.get("readOnly");
    let disabled = readOnly ? 'disabled': '';
    let userAnswer = component.get("userAnswer");


    if (userAnswer) {
      userAnswer.forEach(function(choice){
        let input = `<input type="text" value="${choice}" ${disabled}/>`;
        answers = answers.replace(/_______/, input);
      });

      return answers;
    }
    else {
      let input = `<input type="text" value="" ${disabled}/>`;
      return answers.replace(/_______/g, input);
    }
  }),
  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Notify input answers
   */
  notifyInputAnswers: function () {
    const component = this,
      inputs = component.$(".fib-answers input[type=text]"),
      answers = inputs.map(function (index, input) {
        let answer = Ember.$(input).val();
        return Ember.$.trim(answer);
      }).toArray();

    const answerCompleted = answers.join("").length > 0; //to check that at least 1 answer has text

    const questionUtil = component.get("questionUtil");
    const correct = questionUtil.isCorrect(answers);

    component.notifyAnswerChanged(answers, correct);
    if (answerCompleted){
      component.notifyAnswerCompleted(answers, correct);
    }
    else{
      component.notifyAnswerCleared(answers);
    }

  },
  /**
   * Set answers
   */
  setAnswers:function(){
    const component = this;
    const inputs = component.$(".fib-answers input[type=text]");
    inputs.on("keyup", function () {
      component.notifyInputAnswers();
    });
  }
});
