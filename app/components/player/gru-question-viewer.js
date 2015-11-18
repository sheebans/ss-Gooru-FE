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
  },
  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
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
    var questionHints = this.get('question').hints.length-actualHint;
    return questionHints;
  }),


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
