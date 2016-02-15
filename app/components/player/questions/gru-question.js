import Ember from 'ember';
import { getQuestionUtil } from  'gooru-web/config/question';

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
  /**
   * On init set question properties
   */
  setQuestionProperties: Ember.on('init', function() {
    this.set("questionUtil", getQuestionUtil(this.get("question.questionType")));
  }),

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
   * @property {Resource} question
   */
  question: null,

  /**
   * Question Util based on the question type
   * @property {QuestionUtil}
   */
  questionUtil: null,

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Notifies answer completion
   * @param {*} answer question answer
   * @param {boolean} correct
   */
  notifyAnswerCompleted: function(answer, correct){
    const question = this.get("question");
    this.sendAction('onAnswerCompleted', question, {
      answer: answer,
      correct: correct
    });
  },

  /**
   * Notifies answer completion
   * @param {*} answer question answer
   */
  notifyAnswerCleared: function(){
    const question = this.get("question");
    this.sendAction('onAnswerCleared', {
      answer: answer,
      correct: false
    });
  },

  /**
   * Notifies answer completion
   * @param {*} answer question answer
   */
  notifyAnswerChanged: function(answer){
    const question = this.get("question");
    this.sendAction('onAnswerChanged', question, {
      answer: answer,
      correct: correct
    });
  }

});
