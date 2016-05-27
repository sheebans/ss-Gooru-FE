import Ember from 'ember';
import QuestionResult from 'gooru-web/models/result/question';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'questions', 'gru-question-play'],

  classNameBindings: ['view', 'fixed-header'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions
  actions:{
    submitQuestion: function(){
      Ember.Logger.debug("Submitting question from question player");
    },
    /**
     * Performs a back action in the browser history
     */
    goBack: function() {
      window.history.go(-1);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement: function () {
    this._super(...arguments);
    this.set('fixed-header', true);
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model as instantiated by the route.
   * @property {Course}
   */
  question: null,

  /**
   * Player question format
   * @property {Resource}
   */
  playerQuestion: Ember.computed("question", function(){
    return this.get("question").toPlayerResource();
  }),

  /**
   * Question result for this viewer, it is always an empty result
   */
  questionResult: Ember.computed(function(){
    return QuestionResult.create({});
  })
});
