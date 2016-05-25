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
   * @property {Collection}
   */
  collection: Ember.computed.alias("assessmentResult.collection"),

  /**
   * @property {number} selected attempt
   */
  selectedAttempt: null,

  /**
   * @property {[]}
   */
  resourceLinks: Ember.computed("assessmentResult.resourceResults", function(){
    return this.getResourceLinks(this.get('assessmentResult.resourceResults'));
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
   * @param resourceResults
   * @returns {Array}
   */
  getResourceLinks: function (resourceResults) {
    return resourceResults.map(function (resourceResult, index) {
      return Ember.Object.create({
        label: index + 1, //using index here because the resouce.order could have gaps
        status: resourceResult.get('attemptStatus'),
        value: resourceResult.get('id')
      });
    });
  }

});
