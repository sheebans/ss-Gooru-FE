import Ember from 'ember';
import QuestionComponent from './gru-question';

/**
 * Hot Spot Text
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
    const inputs = component.$(".fib-answers input[type=text]");
    inputs.on("keyup", function () {
      component.notifyInputAnswers();
    });
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
    var answers = component.get("question.text");
    return answers.replace(/_______/g, "<input type=\"text\" value=\"\"/>");
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
        return Ember.$(input).val();
      }),
      answerCompleted = answers.toArray().join("").length > 0;
    component.notifyAnswerChanged(answers);
    if (answerCompleted){
      component.notifyAnswerCompleted(answers);
    }
    else{
      component.notifyAnswerCleared(answers);
    }

  }
});
