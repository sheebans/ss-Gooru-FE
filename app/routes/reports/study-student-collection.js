import Ember from 'ember';
import StudentCollection from 'gooru-web/routes/reports/student-collection';

/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default StudentCollection.extend({

  templateName: 'reports/study-student-collection',

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {UnitService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {LessonService} Service to retrieve unit information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @param {{ assessmentId: string, resourceId: string }} params
   */
  model(params) {
    const route = this;
    const classId = params.classId;
    const courseId = params.courseId;

    const navigateMapService = route.get('navigateMapService');

    return navigateMapService.getCurrentMapContext(courseId, classId).then(function (currentContext) {
      const unitId = currentContext.get('unitId');
      const lessonId = currentContext.get('lessonId');

      return Ember.RSVP.hash({ //loading breadcrumb information and navigation info
        course: route.get('courseService').fetchById(courseId),
        unit: route.get('unitService').fetchById(courseId, unitId),
        lesson: route.get('lessonService').fetchById(courseId, unitId, lessonId),
        mapLocation: navigateMapService.next(currentContext)
      }).then(function (hash) {
        var course = hash.course;
        var unit = hash.unit;
        var lesson = hash.lesson;
        var mapLocation = hash.mapLocation;
        return route.studentCollectionModel(params).then(hash => Object.assign(hash, {
          course,
          unit,
          lesson,
          mapLocation
        }));
      });
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties({
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      mapLocation:  model.mapLocation
    });
  }
});
