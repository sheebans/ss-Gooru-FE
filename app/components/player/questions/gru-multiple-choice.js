import QuestionComponent from './gru-question';
/**
 * Multiple Choice Question
 *
 * Component responsible for controlling the logic and appearance of a multiple
 * choice question inside of the {@link player/gru-question-viewer.js}
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

  classNames:['gru-multiple-choice'],

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
      component.notifyAnswerCompleted(answerId, correct);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string} user answer
   * @see gooru-web/utils/question/multiplce-choice.js
   */
  userAnswer: null
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
