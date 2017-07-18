import Ember from 'ember';
import { ROLES} from 'gooru-web/config/config';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {I18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  /**
   * @type {CourseService}
   */
  courseService: Ember.inject.service('api-sdk/course'),

  actions:{
    /**
     * View Analytics Report
     * Triggered by gru-performance-table
     */
    viewReport:function(assessmentId){
      const route = this;
      let controller = route.get('controller');
      const courseId = controller.get('course.id');
      const unitId = controller.get('unitId');
      const lessonId = controller.get('lessonId');
      const userId = controller.get('profile.id');
      const collectionType = controller.get('collectionType');
      route.transitionTo('reports.student-collection-analytics', { queryParams: {
        courseId,
        unitId,
        lessonId,
        collectionId: assessmentId,
        userId,
        type: collectionType,
        role: ROLES.STUDENT
      }});
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    let route = this;

    const courseId = route.modelFor('student.independent').course.id;

    const course = route.get('courseService').getCourseStructure(courseId, 'assessment');

    return Ember.RSVP.hash({
      courseId,
      course
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('course',model.course);
    controller.set('courseId', model.courseId);
    let unit = model.course.get('children')[0];
    let lesson = unit.get('sortedLessonResults')[0];
    controller.set('unitId',unit.id);
    controller.set('lessonId',lesson.id);
    controller.loadData();
  },

  deactivate: function () {
    this.get('controller').resetValues();
  }
});
