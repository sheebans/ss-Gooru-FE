import Ember from 'ember';

import { roundFloat } from 'gooru-web/utils/math';
import { formatTime } from 'gooru-web/utils/utils';

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


  // -------------------------------------------------------------------------
  // Actions

  /**
   * lessonsNavigation
   */
  lessonsNavigation: function(lessonId){
    console.log('lessonId', lessonId);
    this.transitionTo('class.analytics.performance.teacher.course.lesson', lessonId);
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

    console.log('unitId', unitId);
    console.log('classId', classId);
    console.log('courseId', courseId);
    const headers = this.get('lessonService').findByClassAndCourseAndUnit(classId, courseId, unitId);
    console.log('headers', headers);

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
    const performanceData = this.createDataMatrix(model.headers, model.classPerformanceData);
    const courseData = model.courseData;
    const item = Ember.Object.create({value: courseData.get('id'), label: courseData.get('title')});
    controller.get("teacherController").addToBreadCrumb(item);
    controller.set('performanceDataMatrix', performanceData);
    controller.set('headers', model.headers);
  },

  /**
   * Return data matrix by user
   * @param headers
   * @param classPerformanceData
   */

  createDataMatrix: function (headers, classPerformanceData){
    const route = this;
    const studentPerformanceData = classPerformanceData.get('studentPerformanceData');
    const dataMatrix = Ember.A([]);

    studentPerformanceData.forEach(function(studentPerformance) {
      const user = studentPerformance.get('user');
      const performanceData = studentPerformance.get('performanceData');
      var userData = Ember.Object.create({
        user: user.get('fullName'),
        performanceData: Ember.A([])
      });

      headers.forEach(function(headerItem) {
        const performance = performanceData.findBy('id', user.get('id') + '@' + headerItem.get('id'));
        if (performance) {
          userData.get('performanceData').push(route.createPerformanceObject(performance));
        }
        else {
          userData.get('performanceData').push(undefined);
        }
      });
      // Inserts User averages at position 0 of the current row of performance elements.
      userData.get('performanceData').insertAt(0, route.createUserAverageObject(studentPerformance));
      // Pushes User data in the matrix.
      dataMatrix.push(userData);
    });

    // Inserts the Header average for each item (unit|lesson|collection)
    var itemPerformanceAverageData = Ember.Object.create({
      performanceData: Ember.A([])
    });
    headers.forEach(function(headerItem) {
      const itemPerformanceAverage = route.createItemAverageObject(classPerformanceData, headerItem.get('id'));
      itemPerformanceAverageData.get('performanceData').push(itemPerformanceAverage);
    });
    itemPerformanceAverageData.get('performanceData').insertAt(0, route.createClassAverageObject(classPerformanceData));
    dataMatrix.insertAt(0, itemPerformanceAverageData);

    return dataMatrix;
  },

  createPerformanceObject: function(performance) {
    return Ember.Object.create({
      score: performance.get('score'),
      timeSpent: formatTime(performance.get('timeSpent')),
      completionDone: performance.get('completionDone'),
      completionTotal: performance.get('completionTotal')
    });
  },

  createUserAverageObject: function(studentPerformance) {
    return Ember.Object.create({
      score: roundFloat(studentPerformance.get('averageScore')),
      timeSpent: formatTime(roundFloat(studentPerformance.get('averageTimeSpent'))),
      completionDone: studentPerformance.get('sumCompletionDone'),
      completionTotal: studentPerformance.get('sumCompletionTotal')
    });
  },

  createItemAverageObject: function(classPerformanceData, itemId) {
    return Ember.Object.create({
      score: roundFloat(classPerformanceData.calculateAverageScoreByItem(itemId)),
      timeSpent: formatTime(roundFloat(classPerformanceData.calculateAverageTimeSpentByItem(itemId))),
      completionDone: classPerformanceData.calculateSumCompletionDoneByItem(itemId),
      completionTotal: classPerformanceData.calculateSumCompletionTotalByItem(itemId)
    });
  },

  createClassAverageObject: function(classPerformanceData) {
    return Ember.Object.create({
      score: roundFloat(classPerformanceData.get('classAverageScore')),
      timeSpent: formatTime(roundFloat(classPerformanceData.get('classAverageTimeSpent'))),
      completionDone: classPerformanceData.get('classSumCompletionDone'),
      completionTotal: classPerformanceData.get('classSumCompletionTotal')
    });
  }

});
