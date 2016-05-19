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
    }
  },

  // -------------------------------------------------------------------------
  // Events
  didInsertElement: function () {
    this._super(...arguments);

    const $header = this.$().find('> header');

    if ($header.find('nav').css('display') !== 'none') {
      // If there's a nav in the header then the resolution must be xs or sm
      // Set the default view
      this.set('view', 'content-view');
    }

    // Add fix header behaviour
    var headerWidth = $header.css('width');
    headerWidth = headerWidth && headerWidth.split('px')[0] || '100%';

    // Add inline styles to preserve the same look
    $header.css({
      width: headerWidth
    });

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
