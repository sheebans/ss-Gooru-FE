import Ember from 'ember';

/**
 * Gooru question base component
 *
 * This component contains convenience methods, properties and functionality to share across
 * all question type components
 *
 * @module
 * @see components/player/questions/*.js
 * @augments Ember/Component
 * @typedef {Object} QuestionComponent
 */
export default Ember.Component.extend({

// -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String|Function} onAnswerCompleted - event handler for when the question answer is completed
   */
  onAnswerCompleted: null,

  /**
   * @property {String|Function} onAnswerCleared - event handler for when the question answer is cleared
   */
  onAnswerCleared: null,

  /**
   * @property {String|Function} onAnswerChanged - event handler for when the question answer is changed
   */
  onAnswerChanged: null,

  /**
   * Question information
   * @property {Question} question
   */
  question: null,

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Notifies answer completion
   * @param {*} answer question answer
   */
  notifyAnswerCompleted: function(answer){
    const question = this.get("question");
    this.sendAction('onAnswerCompleted', question, answer);
  },

  /**
   * Notifies answer completion
   * @param {*} answer question answer
   */
  notifyAnswerCleared: function(answer){
    const question = this.get("question");
    this.sendAction('onAnswerCleared', question, answer);
  },

  /**
   * Notifies answer completion
   * @param {*} answer question answer
   */
  notifyAnswerChanged: function(answer){
    const question = this.get("question");
    this.sendAction('onAnswerChanged', question, answer);
  }

});
