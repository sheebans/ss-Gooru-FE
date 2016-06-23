import Ember from 'ember';
import QuestionComponent from './gru-question';
/**
 * True or false Question
 * Component responsible for controlling the logic and appearance of a true
 * or false question inside of the {@link player/gru-question-viewer.js}
 * @module
 * @see controllers/player.js
 * @see components/player/gru-question-viewer.js
 * @augments ember/Component
 */
export default QuestionComponent.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-true-false'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * When the user changes the answer choice selection
     * @param {number} answerId
     */
    selectAnswerChoice: function(answerId){
      const component = this;
      const questionUtil = this.get("questionUtil");
      const correct = questionUtil.isCorrect(answerId);

      component.notifyAnswerChanged(answerId, correct);
      component.notifyAnswerCompleted(answerId, correct);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * Returns the "true" answer id
   */
  trueAnswerId: Ember.computed("question.answers", function(){
    let answers = this.get("question.answers");
    let found = answers.filterBy("isCorrect", true);
    return found ? found.get("firstObject.id") : "true"; //TODO, is this a data problem?
  }),

  /**
   * Returns the "false" answer id
   */
  falseAnswerId: Ember.computed("question.answers", function(){
    let answers = this.get("question.answers");
    let found = answers.filterBy("isCorrect", false);
    return found ? found.get("firstObject.id") : "true"; //TODO, is this a data problem?
  })


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
});
