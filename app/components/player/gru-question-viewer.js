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
     * Action triggered when the user see a hint
     */
    showHint: function(){
      var actualHint = this.get('actualHint');

      this.get('hintsToDisplay').pushObject(this.get('question.hints').objectAt(actualHint));
      this.set('actualHint', ++actualHint);
    },

    showExplanation: function(){
      this.set('isExplanationShown', true);
    },

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
   * Hits available for a question
   * @property {Number} availableHints
   */
  actualHint: 0,

  /**
   * @property {bool} indicates when the answer is completed
   */
  answerCompleted: false,

  /**
   * Hits available for a question
   * @property {Number} availableHints
   */
  availableHints: Ember.computed('actualHint', 'question', function() {
    return this.get('question.hints.length') - this.get('actualHint');
  }),

  doesNotHaveExplanation: Ember.computed.not('question.explanation'),

  /**
   * Hints to display
   * @property {Array} hintsToDisplay
   */
  hintsToDisplay: Ember.A(),

  /**
   * Is the explanation shown?
   * @property {Boolean} disableExplanation
   */
  isExplanationShown: false,

  /**
   * Is the explanation button disabled?
   * @property {Boolean} disableHint
   */
  isExplanationButtonDisabled: Ember.computed.or('isExplanationShown', 'doesNotHaveExplanation'),

  /**
   * Is the hints button disabled?
   * @property {Boolean} disableHint
   */
  isHintButtonDisabled: Ember.computed.not('availableHints'),

  /**
   * @property {bool} indicates when the submit functionality is enabled
   */
  isSubmitDisabled: Ember.computed.not("answerCompleted"),

  /**
   * @property {string} on submit question action
   */
  onSubmitQuestion: 'submitQuestion',

  /**
   * The question
   * @property {Question} question
   */
  question: null,

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Observes for the question itself
   * When it is changed some data should be reloaded
   */
  reloadQuestion: function() {
    this.setProperties({
      actualHint: 0,
      answerCompleted: false,
      hintsToDisplay: Ember.A(),
      isExplanationShown: false
    });
  }.observes("question")

  // -------------------------------------------------------------------------
  // Methods

});
