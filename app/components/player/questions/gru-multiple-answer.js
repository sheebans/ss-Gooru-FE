import Ember from 'ember';
import QuestionComponent from './gru-question';

/**
 * Multiple Answer Question
 *
 * Component responsible for controlling the logic and appearance of a multiple
 * answer question inside of the {@link player/gru-question-viewer.js}
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

  classNames:['gru-multiple-answer'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * When the user changes the answer choice selection
     * @param {number} answerId
     */
    selectAnswerChoice: function(answerId){
      const component = this;
      const questionUtil = component.get("questionUtil");
      const correct = questionUtil.isCorrect(answerId);

      component.notifyAnswerChanged(answerId, correct);

      if (component.isAnswerCompleted()){
        component.notifyAnswerCompleted(answerId, correct);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates when the answer is completed
   * @return {bool}
   */
  isAnswerCompleted: function(){
    const component = this,
      element = Ember.$(component.element),
      totalAnswerChoices = component.get("question.answers.length");
    return element.find("input[type=radio]:checked").length === totalAnswerChoices;
  }

});
