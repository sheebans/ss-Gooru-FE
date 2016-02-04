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
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-summary'],

  // -------------------------------------------------------------------------
  // Events
  init: function () {
    this._super(...arguments);

    var resourceLinks = this.getResourceLinks(this.get('assessmentResult.questionsResults'));
    var attemptList = this.getAttemptList();

    // Sort resource links per the question order number (i.e. label)
    resourceLinks.sort(function (a, b) {
      return a.label - b.label;
    });

    this.set('attempts', attemptList);
    this.set('resourceLinks', resourceLinks);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {AssessmentResult} assessment
   */
  assessmentResult: null,

  /**
   * Concise model to be used by the gru-bubbles component
   * @prop {Object[]}
   */
  resourceLinks: null,


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

  getResourceLinks: function (questionResults) {
    return questionResults.map(function (questionResult) {
      return {
        label: questionResult.get('question.order'),
        status: questionResult.get('correct') ? 'correct' : 'incorrect',
        value: questionResult.id
      };
    });
  }

});
