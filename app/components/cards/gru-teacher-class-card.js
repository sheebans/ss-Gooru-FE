import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['gru-teacher-class-card col-xs-12 col-md-6'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  init(){
    var component = this;
    component._super(...arguments);

    const aClass = component.get('class');
    const courseId = aClass.get('courseId');

    if (courseId) {
      component.get('courseService').fetchById(courseId).then(function(course) {
        if(!component.isDestroyed) {
          component.set('course', course);
        }
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * The course of the class
   * @property {Course}
   */
  course: null,

  /**
   * @property {Object} Object containing student count by class
   */
  classStudentCount: null,

  /**
   * @property {Number} Count of students in the class
   */
  studentCount: Ember.computed('class.id', 'classStudentCount', function() {
    let classStudentCount = this.get('classStudentCount');
    return (classStudentCount && Ember.keys(classStudentCount).length) ?
      (classStudentCount[this.get('class.id')] ? classStudentCount[this.get('class.id')] : 0) : 0;
  })
});
