import Ember from 'ember';
import DS from 'ember-data';
import Utils from 'gooru-web/utils/math';

/**
 * Model that contains a class performance data.
 * @typedef {Object} ClassPerformance
 */
export default DS.Model.extend({

  /**
   * @property {StudentPerformance[]} List of StudentPerformance items
   */
  studentPerformanceData: DS.hasMany('performance/student-performance', { async: false }),

  /**
   * @property {Number} Computed property with the average score of the whole class.
   */
  classAverageScore: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageScore');
  }),

  /**
   * @property {Number} Computed property with the average time spent of the whole class.
   */
  classAverageTimeSpent: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassAverage('averageTimeSpent');
  }),

  /**
   * @property {Number} Computed property with the summatory of completion done for the whole class.
   */
  classSumCompletionDone: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassSum('sumCompletionDone');
  }),

  /**
   * @property {Number} Computed property with the summatory of completion total for the whole class.
   */
  classSumCompletionTotal: Ember.computed('studentPerformanceData', function() {
    return this.calculateClassSum('sumCompletionTotal');
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
   * Function to calculate the average time spent of a unit, lesson or collection|statement
   * @param itemId
   * @returns {Number} the average time spent
   */
  calculateAverageTimeSpentByItem: function(itemId) {
    return this.calculateAverageByField(itemId, 'timeSpent');
  },

  /**
   * Function to calculate the summatory of completion done for a unit or lesson or collection|statement
   * @param itemId
   * @returns {Number} The summatory of completion done
   */
  calculateSumCompletionDoneByItem: function(itemId) {
    return this.calculateSumByField(itemId, 'completionDone');
  },

  /**
   * Function to calculate the summatory of completion total for a unit or lesson or collection|statement
   * @param itemId
   * @returns {Number} The summatory of completion total
   */
  calculateSumCompletionTotalByItem: function(itemId) {
    return this.calculateSumByField(itemId, 'completionTotal');
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
    const value = counter > 0 ? sumValue / counter : sumValue;
    return Utils.roundFloat(value);
  },

  /**
   * Helper function to calculate the summatory of a specific field and unit, lesson or collection|statement.
   * @param itemId the item id
   * @param fieldName the field to calculate
   * @returns {number} the summatory value
   */
  calculateSumByField: function(itemId, fieldName) {
    var sumValue = 0;
    const studentPerformanceData = this.get('studentPerformanceData');
    if (studentPerformanceData.get('length') > 0) {
      studentPerformanceData.forEach(function (studentPerformanceItem) {
        var performanceData = studentPerformanceItem.get('performanceData').findBy('realId', itemId);
        if (performanceData) {
          sumValue += performanceData.get(fieldName);
        }
      });
    }
    return Utils.roundFloat(sumValue);
  },

  /**
   * Helper function to calculate the average of a specified field.
   * @param fieldName required values are score or timeSpent
   * @returns {Number} the average value
   */
  calculateClassAverage: function(fieldName) {
    const counter = this.get('studentPerformanceData.length');
    if (counter > 0) {
      return Utils.roundFloat(this.calculateClassSum(fieldName) / counter);
    } else {
      return 0;
    }
  },

  /**
   * Helper function to calculate the summatory of a specified field.
   * @param fieldName required values are completionDone or completionTotal
   * @returns {Number} the average value
   */
  calculateClassSum: function(fieldName) {
    var sumValue = 0;
    const studentPerformanceData = this.get('studentPerformanceData');
    if (studentPerformanceData.get('length') > 0) {
      studentPerformanceData.forEach(function(studentPerformanceItem) {
        sumValue += studentPerformanceItem.get(fieldName);
      });
    }
    return sumValue;
  },

  /**
   * @property {boolean}
   */
  hasStarted: Ember.computed("studentPerformanceData", function(){
    return this.get("classAverageTimeSpent") > 0 || this.get("classAverageScore") > 0;
  })

});
