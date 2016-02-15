import Ember from "ember";
import QuestionComponent from './gru-question';

/**
 * Open Ended Question
 *
 * Component responsible for controlling the logic and appearance of an open
 * ended question inside of the {@link player/gru-question-viewer.js}
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

  classNames:['gru-open-ended'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {number} max answer length
   */
  maxLength: 1000,

  /**
   * @property {number} characters left
   */
  charactersLeft: function (){
    return this.get("maxLength") - this.get("answer").length;
  }.property("answer"),

  /**
   * @property {string} the user answer
   */
  answer: "",

  // -------------------------------------------------------------------------
  // Observers
  /**
   * When the user changes the response
   */
  updateAnswerObserver: function(){
    const component = this,
      answer = component.get("answer");
    //todo set the answer
    component.notifyAnswerChanged(answer, true);

    if (component.get("isAnswerCompleted")){
      component.notifyAnswerCompleted(answer, true);
    }
    else{
      component.notifyAnswerCleared(answer);
    }
  }.observes("answer"),


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates when the answer is completed
   * @return {bool}
   */
  isAnswerCompleted: Ember.computed.bool("answer.length")

});
