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
  courseService: Ember.inject.service('api-sdk/course'),

  //controllerName: 'unit',


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * navigateToLessons
     */
    navigateToLessons: function (lessonId) {
      const unitId = this.get("controller.unit.id");
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
    const unitIds = Ember.A([
      '31886eac-f998-493c-aa42-016f53e9fa88',
      '7deebd55-1976-40a2-8e46-3b8ec5b6d388',
      '21654d76-45e7-45e9-97ab-5f96a14da135',
      'c1f810a2-c87f-48f5-a899-0d9753383042',
      'dfc99db4-d331-4733-ac06-35358cee5c64'
    ]);
    // TODO: Remove this temporal variable once it is not required
    const users = Ember.A([
      Ember.Object.create({id: '1', username: 'jenniferajoy', firstName: 'Jennifer', lastName: 'Ajoy', units: unitIds}),
      Ember.Object.create({id: '2', username: 'jeffreybermudez', firstName: 'Jeffrey', lastName: 'Bermudez', units: unitIds}),
      Ember.Object.create({id: '3', username: 'javierperez', firstName: 'Javier', lastName: 'Perez', units: unitIds}),
      Ember.Object.create({id: '4', username: 'melanydelagado', firstName: 'Melany', lastName: 'Delgado', units: unitIds}),
      Ember.Object.create({id: '5', username: 'diegoarias', firstName: 'Diego', lastName: 'Arias', units: unitIds}),
      Ember.Object.create({id: '6', username: 'davidquiros', firstName: 'David', lastName: 'Quiros', units: unitIds}),
      Ember.Object.create({id: '7', username: 'adrianporras', firstName: 'Adrian', lastName: 'Porras', units: unitIds}),
      Ember.Object.create({id: '8', username: 'fabianperez', firstName: 'Fabian', lastName: 'Perez', units: unitIds}),
      Ember.Object.create({id: '9', username: 'laurengutierrez', firstName: 'Lauren', lastName: 'Gutierrez', units: unitIds})
    ]);

    const classPerformanceData = this.get('performanceService').findClassPerformanceByUnit(classId, courseId, unitId, { users: users });
    const unitData = Ember.Object.create({id: unitId, title: 'unit 1'});

    return Ember.RSVP.hash({
      headers: headers,
      classPerformanceData: classPerformanceData,
      unitData: unitData
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const performanceData = createDataMatrix(model.headers, model.classPerformanceData);

    controller.get("teacherController").updateBreadcrumb(model.unitData, 'unit');
    controller.set('performanceDataMatrix', performanceData);
    controller.set('headers', model.headers);
    controller.set('unit', model.unitData);

  }
});
