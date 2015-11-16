import Ember from "ember";

/**
 * Multiple Choice Question
 *
 * Component responsible for controlling the logic and appearance of a multiple
 * choice question inside of the {@link player/gru-question-viewer.js}
 *
 * @module
 * @see controllers/player.js
 * @see components/player/gru-question-viewer.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

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
      //todo mark the answer as selected
      this.sendAction('onQuestionChanged', this.get("question"), answerId);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String|Function} onQuestionChanged - event handler for when the question is changed
   */
  onQuestionChanged: null,

  /**
   * Question information
   * @property {Question} question
   */
  question: null

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
