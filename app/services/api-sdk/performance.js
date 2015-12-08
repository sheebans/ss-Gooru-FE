import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  findStudentPerformanceByClassAndCourse: function(userId, classId, courseId) {
    return this.get('store').queryRecord('performance/student-performance', {
      userUid: userId,
      classId: classId,
      courseId: courseId
    });
  },

  findStudentPerformanceByClassAndCourseAndUnit: function(userId, classId, courseId, unitId) {
    return this.get('store').queryRecord('performance/student-performance', {
      userUid: userId,
      classId: classId,
      courseId: courseId,
      unitId: unitId
    });
  }

});
