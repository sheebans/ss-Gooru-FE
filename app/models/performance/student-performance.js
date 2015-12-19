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
   * @property {Performance[]} List of Performance items
   */
  performanceData: DS.hasMany('performance/performance', {async: true}),


  averageScore: Ember.computed('performanceData', function() {
    return this.calculateAverage('score');
  }),

  averageCompletionDone: Ember.computed('performanceData', function() {
    return this.calculateAverage('completionDone');
  }),

  averageTimeSpent: Ember.computed('performanceData', function() {
    return this.calculateAverage('timeSpent');
  }),

  calculateAverage: function(fieldName) {
    var sumValue = 0;
    const performanceData = this.get('performanceData');
    if (performanceData.get('length') > 0) {
      performanceData.forEach(function (performanceItem) {
        sumValue += performanceItem.get(fieldName);
      });
      return sumValue / performanceData.get('length');
    } else {
      return sumValue;
    }
  }

});
