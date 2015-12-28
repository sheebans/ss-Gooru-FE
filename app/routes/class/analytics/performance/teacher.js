import Ember from 'ember';

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
      Ember.Object.create({id: '3', username: 'javierperez', firstName: 'Javier', lastName: 'Perez', units: unitIds})
    ]);

    const classPerformanceData = this.get('performanceService').findClassPerformanceByClassAndCourse(classId, courseId, { users: users });

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
    controller.set('performanceData', performanceData);
    controller.set('headers', model.headers);
    controller.get('classController').selectMenuItem('analytics.performance');
  },

  /**
   * Return data matrix by user
   * @param headers
   * @param classPerformanceData
   */

  createDataMatrix: function (headers, classPerformanceData){
    const studentPerformanceData = classPerformanceData.get('studentPerformanceData');
    const dataMatrix = Ember.A([]);

    studentPerformanceData.forEach(function(studentPerformance) {
      const user = studentPerformance.get('user');
      const performanceData = studentPerformance.get('performanceData');
      var userData = Ember.Object.create({
        user: user.get('fullName'),
        performanceData: Ember.A([])
      });
      headers.forEach(function(unit) {
        const performance = performanceData.findBy('id', user.get('id') + '@' + unit.get('id'));
        if (performance) {
          const performanceValues = Ember.Object.create({
            score: performance.get('score'),
            completionDone: performance.get('completionDone'),
            completionTotal: performance.get('completionTotal'),
            timeSpent: performance.get('timeSpent')
          });
          userData.get('performanceData').push(performanceValues);
        }
        else {
          userData.get('performanceData').push(undefined);
        }
      });
      dataMatrix.push(userData);
    });
    return dataMatrix;
  }

});
