import Ember from 'ember';

import { createDataMatrix } from 'gooru-web/utils/performance-data';

/**
 * Teacher Analytics Performance Route - Course Level
 *
 * Route responsible of the transitions and loading the model/data for the teacher class performance at course level
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  unitService: Ember.inject.service('api-sdk/unit'),
  performanceService: Ember.inject.service('api-sdk/performance'),
  courseService: Ember.inject.service('api-sdk/course'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * unitsNavigation
    */
    unitsNavigation: function(unitId){
      this.transitionTo('class.analytics.performance.teacher.course.unit', unitId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function() {
    const classId= this.paramsFor('class').classId;
    const courseId = this.modelFor('class').class.get('course');

    // Remove this
    // this.get('unitService').findById(courseId, '31886eac-f998-493c-aa42-016f53e9fa88');

    const headers = this.get('unitService').findByClassAndCourse(classId, courseId);

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

    const classPerformanceData = this.get('performanceService').findClassPerformance(classId, courseId, { users: users });
    const courseData = this.get('courseService').findById(courseId);

    return Ember.RSVP.hash({
      headers: headers,
      classPerformanceData: classPerformanceData,
      courseData: courseData
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const performanceData = createDataMatrix(model.headers, model.classPerformanceData);
    const courseData = model.courseData;
    const item = Ember.Object.create({value: courseData.get('id'), label: courseData.get('title')});
    controller.get("teacherController").addToBreadCrumb(item);
    controller.set('performanceDataMatrix', performanceData);
    controller.set('headers', model.headers);
  }

});
