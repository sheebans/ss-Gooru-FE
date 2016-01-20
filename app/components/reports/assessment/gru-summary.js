import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-summary'],

  // -------------------------------------------------------------------------
  // Events
  init: function () {
    this._super(...arguments);

    var selectedAttempt = this.get('assessment.attempts').indexOf(this.get('attempt.id')) + 1;
    var resourceLinks = this.getResourceLinks(this.get('attempt.questionResults'));

    // Sort resource links per the question order number (i.e. label)
    resourceLinks.sort(function (a, b) {
      return a.label - b.label;
    });

    this.set('selectedAttempt', selectedAttempt);
    this.set('resourceLinks', resourceLinks);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {AssessmentResult} assessment
   */
  assessment: null,

  /**
   * @property {AttemptResult} attempt
   */
  attempt: null,

  /**
   * @property {number} selectedAttempt - Index of selected attempt from a list of attempt IDs
   */
  selectedAttempt: 0,

  /**
   * Concise model to be used by the gru-bubbles component
   * @prop {Object[]}
   */
  resourceLinks: null,


  // -------------------------------------------------------------------------
  // Methods
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
