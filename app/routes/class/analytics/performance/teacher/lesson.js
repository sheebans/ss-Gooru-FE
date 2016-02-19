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
  /**
   * @type CollectionService
   */
  collectionService: Ember.inject.service('api-sdk/collection'),
  /**
   * @type PerformanceService
   */
  performanceService: Ember.inject.service('api-sdk/performance'),
  /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),
  /**
   * @type UnitService
   */
  unitService: Ember.inject.service('api-sdk/unit'),


  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * navigateToAssessments
     */
    navigateToCollection: function (collectionId) {
      const unitId = this.get("controller.unit.id");
      const lessonId = this.get("controller.lesson.id");
      this.transitionTo('class.analytics.performance.teacher.collection', unitId, lessonId, collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function(params) {

    const classModel = this.modelFor('class');
    const lessonId = params.lessonId;
    const unitId = params.unitId;
    const classId= this.paramsFor('class').classId;
    const courseId = classModel.class.get('course');
    const users = classModel.members;

    const collections = this.get('collectionService').findByClassAndCourseAndUnitAndLesson(classId, courseId, unitId, lessonId);
    const classPerformanceData = this.get('performanceService').findClassPerformanceByUnitAndLesson(classId, courseId, unitId, lessonId, users);
    const unit = this.get('unitService').findById(courseId, unitId);
    const lesson = this.get('lessonService').findById(courseId, unitId, lessonId);

    return Ember.RSVP.hash({
      collections: collections,
      classPerformanceData: classPerformanceData,
      lesson: lesson,
      unit: unit
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {

    const performanceData = createDataMatrix(model.collections, model.classPerformanceData);
    controller.set('performanceDataMatrix', performanceData);
    controller.set('collections', model.collections);
    controller.set('unit', model.unit);
    controller.set('lesson', model.lesson);

    //updating the breadcrumb with the unit, useful when refreshing the page
    controller.get("teacherController").updateBreadcrumb(model.unit, 'unit');
    //updating the breadcrumb with the lesson
    controller.get("teacherController").updateBreadcrumb(model.lesson, 'lesson');
    //enabling filters
    controller.set("teacherController.showFilters", true);

  }

});
