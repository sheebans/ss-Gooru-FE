import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),
  /**
   * @type {AssessmentService}
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Methods

  model: function() {

    const route = this;

    //TODO
    //var filterCriteria = {
    //  courseId: '1',
    //  unitId: '2',
    //  lessonId: '3'
    //};
    const userId = route.get('session.userId');

    return route.get('assessmentService').findAssessments().then(function(assessments) {
      return route.get('performanceService').findAssessmentsPerformance(assessments, userId).then(function(studentPerformanceItems) {
        return Ember.RSVP.hash({
          assessments: assessments,
          studentPerformanceItems: studentPerformanceItems
        });
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('assessments', model.assessments);
    controller.set('studentPerformanceItems', model.studentPerformanceItems);
  }
});
