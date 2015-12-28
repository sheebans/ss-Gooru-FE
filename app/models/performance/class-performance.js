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

  /**
   * @property {Number} Computed property with the average score of the whole class.
   */
  classAverageScore: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageScore');
  }),

  /**
   * @property {Number} Computed property with the average completion done of the whole class.
   */
  classAverageCompletionDone: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageCompletionDone');
  }),

  /**
   * @property {Number} Computed property with the average time spent of the whole class.
   */
  classAverageTimeSpent: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageTimeSpent');
  }),

  /**
   * Function to calculate the average score of a unit, lesson or collection|statement
   * @param itemId
   * @returns {Number} the average score
   */
  calculateAverageScoreByItem: function(itemId) {
    return this.calculateAverageByField(itemId, 'score');
  },

  /**
   * Function to calculate the average completion done of a unit, lesson or collection|statement
   * @param itemId
   * @returns {Number} the average completion done
   */
  calculateAverageCompletionDoneByItem: function(itemId) {
    return this.calculateAverageByField(itemId, 'completionDone');
  },

  /**
   * Function to calculate the average time spent of a unit, lesson or collection|statement
   * @param itemId
   * @returns {Number} the average time spent
   */
  calculateAverageTimeSpentByItem: function(itemId) {
    return this.calculateAverageByField(itemId, 'timeSpent');
  },

  /**
   * Helper function to calculate the average value of a specific field and unit, lesson or collection|statement.
   * @param itemId the item id
   * @param fieldName the field to calculate
   * @returns {number} the average value
   */
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

  /**
   * Helper function to calculate the specified class average type.
   * @param averageType the type score, completionDone or timeSpent
   * @returns {number} the average value
   */
  calculateClassAverage: function(averageType) {
    const studentPerformanceData = this.get('studentPerformanceData');
    if (studentPerformanceData.get('length') > 0) {
      var sumValue = 0;
      studentPerformanceData.forEach(function(studentPerformanceItem) {
        sumValue += studentPerformanceItem.get(averageType);
      });
      return sumValue / studentPerformanceData.get('length');
    }
    return 0;
  }

});
