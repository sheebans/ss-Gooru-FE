import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Handle event triggered by gru-bubbles
     */
    bubbleSelect:function(bubbleOption) {
      this.sendAction("onBubbleSelect", bubbleOption);
    },

    /**
     * Handle event triggered by gru-bubbles
     */
    selectAttempt:function(attempt) {
      this.set("selectedAttempt", attempt);
      this.sendAction("onSelectAttempt", attempt);
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-summary'],

  // -------------------------------------------------------------------------
  // Events
  init: function () {
    this._super(...arguments);
    this.set('selectedAttempt', this.get("assessmentResult.totalAttempts"));
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {AssessmentResult} assessment
   */
  assessmentResult: null,

  /**
   * @property {number} selected attempt
   */
  selectedAttempt: null,

  /**
   * @property {[]}
   */
  resourceLinks: Ember.computed("assessmentResult.questionResults", function(){
    var resourceLinks = this.getResourceLinks(this.get('assessmentResult.questionResults'));
    // Sort resource links per the question order number (i.e. label)
    resourceLinks.sort(function (a, b) {
      return a.label - b.label;
    });
    return resourceLinks;
  }),

  /**
   * @property {[]}
   */
  attempts: Ember.computed("assessmentResult.totalAttempts", function(){
    return this.getAttemptList();
  }),


  // -------------------------------------------------------------------------
  // Methods
  getAttemptList: function () {
    var attempts = [];
    var totalAttempts = this.get('assessmentResult.totalAttempts');

    for (; totalAttempts > 0; totalAttempts--) {
      attempts.push({
        label: totalAttempts,
        value: totalAttempts
      });
    }
    return attempts;
  },

  /**
   * Convenience structure to render resource information
   * @param questionResults
   * @returns {Array}
   */
  getResourceLinks: function (questionResults) {
    return questionResults.map(function (questionResult) {
      return Ember.Object.create({
        label: questionResult.get('question.order'),
        status: questionResult.get('correct') ? 'correct' : 'incorrect',
        value: questionResult.get('id')
      });
    });
  }

});
