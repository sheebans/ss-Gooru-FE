import Ember from 'ember';

import { roundFloat } from '../../../../utils/math';

/**
 * Teacher Analytics Performance Route
 *
 * Route responsible of the transitions and loading the model/data for the teacher class performance
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  unitService: Ember.inject.service('api-sdk/unit'),

  performanceService: Ember.inject.service('api-sdk/performance'),


  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function() {
    const classId= this.paramsFor('class').classId;
    const courseId = this.modelFor('class').class.get('course');
    const headers = this.get('unitService').findByClassAndCourse(classId, courseId);

    // TODO: Remove this temporal variable once it is not required
    const unitIds = Ember.A([
      '31886eac-f998-493c-aa42-016f53e9fa88',
      '7deebd55-1976-40a2-8e46-3b8ec5b6d388',
      '21654d76-45e7-45e9-97ab-5f96a14da135',
      '21654d76-45e7-45e9-97ab-5f96a14da136',
      '21654d76-45e7-45e9-97ab-5f96a14da137',
      '21654d76-45e7-45e9-97ab-5f96a14da138'
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

    return Ember.RSVP.hash({
      headers: headers,
      classPerformanceData: classPerformanceData
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const performanceData = this.createDataMatrix(model.headers, model.classPerformanceData);
    controller.set('performanceDataMatrix', performanceData);
    controller.set('headers', model.headers);
    controller.get('classController').selectMenuItem('analytics.performance');
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
      timeSpent: performance.get('timeSpent'),
      completionDone: performance.get('completionDone'),
      completionTotal: performance.get('completionTotal')
    });
  },

  createUserAverageObject: function(studentPerformance) {
    return Ember.Object.create({
      score: roundFloat(studentPerformance.get('averageScore')),
      timeSpent: roundFloat(studentPerformance.get('averageTimeSpent')),
      completionDone: studentPerformance.get('sumCompletionDone'),
      completionTotal: studentPerformance.get('sumCompletionTotal')
    });
  },

  createItemAverageObject: function(classPerformanceData, itemId) {
    return Ember.Object.create({
      score: roundFloat(classPerformanceData.calculateAverageScoreByItem(itemId)),
      timeSpent: roundFloat(classPerformanceData.calculateAverageTimeSpentByItem(itemId)),
      completionDone: classPerformanceData.calculateSumCompletionDoneByItem(itemId),
      completionTotal: classPerformanceData.calculateSumCompletionTotalByItem(itemId)
    });
  },

  createClassAverageObject: function(classPerformanceData) {
    return Ember.Object.create({
      score: roundFloat(classPerformanceData.get('classAverageScore')),
      timeSpent: roundFloat(classPerformanceData.get('classAverageTimeSpent')),
      completionDone: classPerformanceData.get('classSumCompletionDone'),
      completionTotal: classPerformanceData.get('classSumCompletionTotal')
    });
  }

});
