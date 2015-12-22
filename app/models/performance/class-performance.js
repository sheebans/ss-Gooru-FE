import Ember from 'ember';
import DS from 'ember-data';

/**
 * Model that contains a class performance data.
 * @typedef {Object} ClassPerformance
 */
export default DS.Model.extend({

  /**
   * @property {StudentPerformance[]} List of StudentPerformance items
   */
  studentPerformanceData: DS.hasMany('performance/student-performance', { async: true }),

  calculateClassAverageScore: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageScore');
  }),

  calculateClassAverageCompletionDone: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageCompletionDone');
  }),

  calculateClassAverageTimeSpent: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageTimeSpent');
  }),

  calculateAverageScoreByItem: function(itemId) {
    return this.calculateAverageByField(itemId, 'score');
  },

  calculateAverageCompletionDoneByItem: function(itemId) {
    return this.calculateAverageByField(itemId, 'completionDone');
  },

  calculateAverageTimeSpentByItem: function(itemId) {
    return this.calculateAverageByField(itemId, 'timeSpent');
  },

  calculateAverageByField: function(itemId, fieldName) {
    var sumValue = 0;
    var counter = 0;
    const studentPerformanceData = this.get('studentPerformanceData');
    if (studentPerformanceData.get('length') > 0) {
      studentPerformanceData.forEach(function (studentPerformanceItem) {
        var performanceData = studentPerformanceItem.get('performanceData').findBy('realId', itemId);
        if (performanceData) {
          counter++;
          sumValue += performanceData.get(fieldName);
        }
      });
    }
    return counter > 0 ? sumValue / counter : sumValue;
  },

  calculateClassAverage: function(averageType) {
    const studentPerformanceData = this.get('studentPerformanceData');
    if (studentPerformanceData.get('length') > 0) {
      var sumValue = 0;
      studentPerformanceData.forEach(function(studentPerformanceItem) {
        sumValue += studentPerformanceItem[averageType];
      });
      return sumValue / studentPerformanceData.get('length');
    }
    return 0;
  }

});
