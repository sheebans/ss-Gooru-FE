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
  unitService: Ember.inject.service("api-sdk/unit"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function() {
    const classId= this.paramsFor('class').classId;
    const courseId = this.modelFor('class').class.get("course");
    const headers = this.get("unitService").findByClassAndCourse(classId,courseId);
    const classPerformanceData = Ember.Object.create({
      studentPerformanceData: Ember.A([
        Ember.Object.create({
          user: Ember.Object.create({fullName: 'Jennifer Ajoy'}),
          performanceData:  Ember.A([Ember.Object.create({
            id: '82168746-a4af-48aa-9975-01f6434cd806',
            score : 10,
            completionDone: 13,
            completionTotal: 50,
            timeSpent: 3600
          })])
        }),
        Ember.Object.create({
          user: Ember.Object.create({fullName: 'Jeffrey Bermudez'}),
          performanceData:  Ember.A([Ember.Object.create({
            id: '82168746-a4af-48aa-9975-01f6434cd806',
            score : 50,
            completionDone: 11,
            completionTotal: 40,
            timeSpent: 2600
          })])
        }),
        Ember.Object.create({
          user: Ember.Object.create({fullName: 'Javier Perez'}),
          performanceData:  Ember.A([Ember.Object.create({
            id: 'a4af-48aa-9975-01f6434cd806',
            score : 50,
            completionDone: 11,
            completionTotal: 40,
            timeSpent: 2600
          })])
        })
      ])
    });

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
    controller.set("performanceData", performanceData);
    controller.set("headers", model.headers);
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
        const performance = performanceData.findBy('id', unit.get('id'));
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
