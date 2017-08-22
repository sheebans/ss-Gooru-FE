import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-rubric-panel'],

  classNameBindings: ['showFullRubric:full-rubric'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Change tabs to grading or rubric
     */
    selectTab: function(tabName) {
      this.set('tab', tabName);
    },

    /**
     * Hide/show full rubric
     */
    showFullRubric: function() {
      this.set('showFullRubric', !this.get('showFullRubric'));
    },

    /**
     * Load the next student
     */
    loadNext: function() {
      this.sendAction('onLoadNext');
    },

    /**
     * Load the previous student
     */
    loadPrevious: function() {
      this.sendAction('onLoadPrevious');
    },

    /**
     * Submit a grade
     */
    submitGrade: function() {
      this.sendAction('onSubmitGrade');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Grade values
   * @property {Grade} grade
   */
  grade: null,

  /**
   * If grading is selected
   * @property {Boolean} isGrading
   */
  isGrading: Ember.computed.equal('tab', 'grading'),

  /**
   * If rubric is selected
   * @property {Boolean} isRubric
   */
  isRubric: Ember.computed.equal('tab', 'rubric'),

  /**
   * Action to send when a grade is submitted
   * @property {String} onSubmitGrade
   */
  onSubmitGrade: false,

  /**
   * Rubric to grade
   * @property {Rubric} rubric
   */
  rubric: null,

  /**
   * @property {Boolean} showFullRubric
   */
  showFullRubric: false,

  /**
   * Current tab name selected
   * @property {String} tab
   */
  tab: 'grading',

  /**
   * If the next button should be disabled
   * @property {boolean} isNextDisabled
   */
  isNextDisabled: false,

  /**
   * If the previous button should be disabled
   * @property {boolean} isPreviousDisabled
   */
  isPreviousDisabled: false
});
