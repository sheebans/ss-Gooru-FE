import Ember from 'ember';
import DS from 'ember-data';

/**
 * Model that contains the student performance data by unit, lesson or collection|assessment.
 * @typedef {Object} StudentPerformance
 */
export default DS.Model.extend({

  /**
   * @property {Meta} metadata
   */
  user: DS.belongsTo("user/user", {async: true}),

  /**
   * @property {Performance[]} List of Performance items.
   */
  performanceData: DS.hasMany('performance/performance', { async: true }),

  /**
   * @property {Number} Computed property with the average score of all the units.
   */
  averageScore: Ember.computed('performanceData', function() {
    return this.calculateAverage('score');
  }),

  /**
   * @property {Number} Computed property with the average completion done of all the units.
   */
  averageCompletionDone: Ember.computed('performanceData', function() {
    return this.calculateAverage('completionDone');
  }),

  /**
   * @property {Number} Computed property with the average time spent of all the units.
   */
  averageTimeSpent: Ember.computed('performanceData', function() {
    return this.calculateAverage('timeSpent');
  }),

  /**
   * Helper function to calculate the average value of a specific field.
   * @param fieldName the field to calculate
   * @returns {number} the average value
   */
  calculateAverage: function(fieldName) {
    var sumValue = 0;
    const performanceData = this.get('performanceData');
    if (performanceData.get('length') > 0) {
      performanceData.forEach(function (performanceItem) {
        sumValue += performanceItem.get(fieldName);
      });
      return this.roundFloat(sumValue / performanceData.get('length'));
    } else {
      return sumValue;
    }
  },

  roundFloat: function(n, decimals=0) {
    return (Math.round(n * 10) / 10).toFixed(decimals);
  }
});
