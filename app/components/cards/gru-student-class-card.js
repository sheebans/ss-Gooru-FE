import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-student-class-card col-xs-12 col-md-6'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {Number} total
   * Computed property for performance total to add a default value
   */
  total: Ember.computed('class.performanceSummary.total', function() {
    let total = this.get('class.performanceSummary.total');
    return total || 1;
  }),

  /**
   * @property {Number} totalCompleted
   * Computed property for performance total completed to add a default value
   */
  totalCompleted: Ember.computed('class.performanceSummary.totalCompleted', function() {
    let totalCompleted = this.get('class.performanceSummary.totalCompleted');
    return totalCompleted || 0;
  })
});
