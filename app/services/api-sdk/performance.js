import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  /**
   * Gets the student units performance data for a specific class and course.
   * @param userId user id
   * @param classId class id
   * @param courseId course id
   * @returns {*}
   */
  findStudentPerformanceByClassAndCourse: function(userId, classId, courseId) {
    return this.get('store').queryRecord('performance/student-performance', {
      userUid: userId,
      classId: classId,
      courseId: courseId
    });
  },

  /**
   * Get the student lessons and collections/assessments data for a specific class, course and unit.
   * @param userId user id
   * @param classId class id
   * @param courseId course id
   * @param unitId unit id
   * @returns {*}
   */
  findStudentPerformanceByClassAndCourseAndUnit: function(userId, classId, courseId, unitId) {
    return this.get('store').queryRecord('performance/student-lesson-performance', {
      userUid: userId,
      classId: classId,
      courseId: courseId,
      unitId: unitId
    });
  }

});
