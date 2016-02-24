import Ember from 'ember';

import { createDataMatrix } from 'gooru-web/utils/performance-data';

/**
 * Teacher Analytics Performance Route - Course/Unit Level
 *
 * Route responsible of the transitions and loading the model/data for the teacher class performance at course/unit level
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  lessonService: Ember.inject.service('api-sdk/lesson'),
  performanceService: Ember.inject.service('api-sdk/performance'),
  unitService: Ember.inject.service('api-sdk/unit'),

  //controllerName: 'unit',


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * navigateToLessons
     */
    navigateToLessons: function (lessonId) {

      const unitId = this.get("controller.unitId").get('id');

      this.transitionTo('class.analytics.performance.teacher.lesson', unitId, lessonId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function(params) {

    const classModel = this.modelFor('class');
    const unitId = params.unitId;
    const classId= this.paramsFor('class').classId;
    const courseId = classModel.class.get('course');
    const users = classModel.members;

    const lessons = this.get('lessonService').findByClassAndCourseAndUnit(classId, courseId, unitId);
    const classPerformanceData = this.get('performanceService').findClassPerformanceByUnit(classId, courseId, unitId, users);
    const unit = this.get('unitService').findById(courseId, unitId);

    return Ember.RSVP.hash({
      lessons: lessons,
      classPerformanceData: classPerformanceData,
      unit: unit
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const performanceData = createDataMatrix(model.lessons, model.classPerformanceData);
    controller.get("teacherController").updateBreadcrumb(model.unit, 'unit');
    controller.set('performanceDataMatrix', performanceData);
    controller.set('lessons', model.lessons);
    controller.set('unitId', model.unit);

    //enabling filters
    controller.set("teacherController.showFilters", true);

  }
});
