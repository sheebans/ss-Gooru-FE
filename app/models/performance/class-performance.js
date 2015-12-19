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

  calculateUnitAverageScore: function(unit) {
    return this.calculateUnitAverage(unit, 'score');
  },

  calculateUnitAverageCompletionDone: function(unit) {
    return this.calculateUnitAverage(unit, 'completionDone');
  },

  calculateUnitAverageTimeSpent: function(unit) {
    return this.calculateUnitAverage(unit, 'timeSpent');
  },

  calculateUnitAverage: function(unit, fieldName) {
    var sumValue = 0;
    var counter = 0;

    const studentPerformanceData = this.get('studentPerformanceData');
    if (studentPerformanceData.get('length') > 0) {
      studentPerformanceData.forEach(function (studentPerformanceItem) {
        var performanceData = studentPerformanceItem.get('performanceData').findBy('realId', unit);
        if (performanceData) {
          counter++;
          sumValue += performanceData.get(fieldName);
        }
      });
    }

    return counter > 0 ? sumValue / counter : sumValue;
  }

});
