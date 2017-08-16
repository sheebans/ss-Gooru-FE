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
  tab: 'grading'
});
