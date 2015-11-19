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
    showHint:function(){
      var actualHint = Math.round(this.get('actualHint'));
      this.get('hintsToDisplay').pushObject(this.get('question').hints[actualHint]);
      this.set('actualHint',this.get('actualHint')+1);
      if(this.get('actualHint') === this.get('question').hints.length){
        this.set('disableHint',true);
      }
    },
    showExplanation:function(){
      this.set('explanation',this.get('question').explanation);
      this.set('disableExplanation',true);
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
   * @property {string} on submit question action
   */
  onSubmitQuestion: 'submitQuestion',

  /**
   * The question
   * @property {Question} question
   */
  question: null,

  /**
   * Hits available for a question
   * @property {Number} availableHints
   */
  actualHint:0,

  /**
   * Hints to display
   * @property {Array} hintsToDisplay
   */
  hintsToDisplay:Ember.ArrayProxy.create({
    content: [
    ]
  }),

  /**
   * Explanation to display
   * @property {String} explanation
   */
  explanation:null,

  /**
   * Show if the button Explanation is disable
   * @property {Boolean} disableExplanation
   */
  disableExplanation:false,

  /**
   * Hits available for a question
   * @property {Number} availableHints
   */
  availableHints: Ember.computed('actualHint','question',function() {
    var actualHint = Math.round(this.get('actualHint'));
    return this.get('question.hints.length') - actualHint;
  }),

  /**
   * @property {bool} indicates when the answer is completed
   */
  answerCompleted: false,

  /**
   * @property {bool} indicates when the submit functionality is enabled
   */
  isSubmitDisabled: Ember.computed.not("answerCompleted"),


  // -------------------------------------------------------------------------
  // Observers
  /**
   * Observes for the question itself
   * When it is changed some data should be reloaded
   */
  reloadQuestion: function(){
    this.set("answerCompleted", false);
  }.observes("question")

  // -------------------------------------------------------------------------
  // Methods

});
