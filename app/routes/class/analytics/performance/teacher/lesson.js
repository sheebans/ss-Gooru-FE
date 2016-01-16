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
  collectionService: Ember.inject.service('api-sdk/collection'),
  performanceService: Ember.inject.service('api-sdk/performance'),
  lessonService: Ember.inject.service('api-sdk/lesson'),


  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * navigateToAssessments
     */
    navigateToAssessments: function (assessmentId) {
      console.log(assessmentId);
      //this.transitionTo('class.analytics.performance.teacher.course.assessments', assessmentId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function(params) {

    const lessonId = params.lessonId;
    const unitId = params.unitId;
    const classId= this.paramsFor('class').classId;
    const courseId = this.modelFor('class').class.get('course');

    const headers = this.get('collectionService').findByClassAndCourseAndUnitAndLesson(classId, courseId, unitId, lessonId);

    // TODO: Remove this temporal variable once it is not required
    const collectionIds = Ember.A([
      '5028ac7f-82da-4f09-998b-ecf480d4b984',
      '363d3cc2-f2ac-490d-a870-42167f204c97'
    ]);
    // TODO: Remove this temporal variable once it is not required
    const users = Ember.A([
      Ember.Object.create({id: '1', username: 'jenniferajoy', firstName: 'Jennifer', lastName: 'Ajoy', units: collectionIds}),
      Ember.Object.create({id: '2', username: 'jeffreybermudez', firstName: 'Jeffrey', lastName: 'Bermudez', units: collectionIds}),
      Ember.Object.create({id: '3', username: 'javierperez', firstName: 'Javier', lastName: 'Perez', units: collectionIds}),
      Ember.Object.create({id: '4', username: 'melanydelagado', firstName: 'Melany', lastName: 'Delgado', units: collectionIds}),
      Ember.Object.create({id: '5', username: 'diegoarias', firstName: 'Diego', lastName: 'Arias', units: collectionIds}),
      Ember.Object.create({id: '6', username: 'davidquiros', firstName: 'David', lastName: 'Quiros', units: collectionIds}),
      Ember.Object.create({id: '7', username: 'adrianporras', firstName: 'Adrian', lastName: 'Porras', units: collectionIds}),
      Ember.Object.create({id: '8', username: 'fabianperez', firstName: 'Fabian', lastName: 'Perez', units: collectionIds}),
      Ember.Object.create({id: '9', username: 'laurengutierrez', firstName: 'Lauren', lastName: 'Gutierrez', units: collectionIds})
    ]);

    const classPerformanceData = this.get('performanceService').findClassPerformanceByUnitAndLesson(classId, courseId, unitId, lessonId, { users: users });
    const lesson = this.get('lessonService').findById(courseId, unitId, lessonId);

    return Ember.RSVP.hash({
      headers: headers,
      classPerformanceData: classPerformanceData,
      lesson: lesson
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {

    const performanceData = createDataMatrix(model.headers, model.classPerformanceData);

    controller.get("teacherController").updateBreadcrumb(model.lesson, 'lesson');
    controller.set('performanceDataMatrix', performanceData);
    controller.set('headers', model.headers);
    controller.set('lesson', model.lesson);
  }

});
