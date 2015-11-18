import Ember from "ember";

/**
 * Player question viewer
 *
 * Component responsible for providing a frame where all question types
 * will be displayed i.e. it will be responsible for selecting any specific
 * question components per question type.
 *
 * @module
 * @see controllers/player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-question-viewer'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * When the question is submitted
     */
    submitQuestion: function () {
      this.sendAction("onSubmitQuestion", this.get("question"));
    },
    /**
     * When the question answer has been changed
     * @param {Question} question the question
     */
    changeAnswer: function(question){
      //todo track analytics
      this.set("question", question);
    },

    /**
     * When the question answer has been completed
     * @param {Question} question the question
     */
    completeAnswer: function(question){
      //todo track analytics
      this.set("question", question);
      this.set("answerCompleted", true);
    },

    /**
     * When the question answer has been cleared
     * @param {Question} question the question
     */
    clearAnswer: function(question){
      //todo track analytics
      this.set("question", question);
      this.set("answerCompleted", false);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string} on submit question action
   */
  onSubmitQuestion: 'submitQuestion',

  /**
   * The question
   * @property {Question} question
   */
  question: null,

  /**
   * @property {bool} indicates when the answer is completed
   */
  answerCompleted: false,

  /**
   * @property {bool} indicates when the submit functionality is enabled
   */
  isSubmitDisabled: Ember.computed.not("answerCompleted")


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
