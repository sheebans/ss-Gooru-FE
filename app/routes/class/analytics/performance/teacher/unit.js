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

    const unitId = params.unitId;
    const classId= this.paramsFor('class').classId;
    const courseId = this.modelFor('class').class.get('course');

    const headers = this.get('lessonService').findByClassAndCourseAndUnit(classId, courseId, unitId);

    // TODO: Remove this temporal variable once it is not required
    const lessonIds = Ember.A([
      'fbd76aed-1b8d-4c2c-a9c6-c7603eef347c',
      'aaac5d15-8434-43ff-8f8b-78cf0b6fd032',
      'cc2bc04c-05ab-4407-9d76-b7021d6138e3'
    ]);
    // TODO: Remove this temporal variable once it is not required
    const users = Ember.A([
      Ember.Object.create({id: '1', username: 'jenniferajoy', firstName: 'Jennifer', lastName: 'Ajoy', units: lessonIds}),
      Ember.Object.create({id: '2', username: 'jeffreybermudez', firstName: 'Jeffrey', lastName: 'Bermudez', units: lessonIds}),
      Ember.Object.create({id: '3', username: 'javierperez', firstName: 'Javier', lastName: 'Perez', units: lessonIds}),
      Ember.Object.create({id: '4', username: 'melanydelagado', firstName: 'Melany', lastName: 'Delgado', units: lessonIds}),
      Ember.Object.create({id: '5', username: 'diegoarias', firstName: 'Diego', lastName: 'Arias', units: lessonIds}),
      Ember.Object.create({id: '6', username: 'davidquiros', firstName: 'David', lastName: 'Quiros', units: lessonIds}),
      Ember.Object.create({id: '7', username: 'adrianporras', firstName: 'Adrian', lastName: 'Porras', units: lessonIds}),
      Ember.Object.create({id: '8', username: 'fabianperez', firstName: 'Fabian', lastName: 'Perez', units: lessonIds}),
      Ember.Object.create({id: '9', username: 'laurengutierrez', firstName: 'Lauren', lastName: 'Gutierrez', units: lessonIds})
    ]);

    const classPerformanceData = this.get('performanceService').findClassPerformanceByUnit(classId, courseId, unitId, { users: users });
    const unit = this.get('unitService').findById(courseId, unitId);

    return Ember.RSVP.hash({
      headers: headers,
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
    const performanceData = createDataMatrix(model.headers, model.classPerformanceData);

    controller.get("teacherController").updateBreadcrumb(model.unit, 'unit');
    controller.set('performanceDataMatrix', performanceData);
    controller.set('headers', model.headers);
    controller.set('unitId', model.unit);

  }
});
