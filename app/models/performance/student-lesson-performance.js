import DS from 'ember-data';
import StudentPerformanceModel from './student-performance';

/**
 * Model that contains the student lesson performance information
 * @typedef {Object} StudentLessonPerformance
 */
export default StudentPerformanceModel.extend({

  /**
   * @property {StudentPerformance[]} List of student performance data for collections/assessments
   */
  collections: DS.hasMany('performance/student-performance')

});
