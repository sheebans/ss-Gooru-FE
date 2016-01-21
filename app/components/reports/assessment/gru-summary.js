import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-summary'],

  // -------------------------------------------------------------------------
  // Events
  init: function () {
    this._super(...arguments);

    var resourceLinks = this.getResourceLinks(this.get('assessment.questionsResults'));
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
  assessment: null,

  /**
   * Concise model to be used by the gru-bubbles component
   * @prop {Object[]}
   */
  resourceLinks: null,


  // -------------------------------------------------------------------------
  // Methods
  getAttemptList: function () {
    var attempts = [];
    var totalAttempts = this.get('assessment.totalAttempts');

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
        label: questionResult.question.order,
        status: questionResult.correct ? 'correct' : 'incorrect',
        value: questionResult.id
      };
    });
  }

});
