import Ember from 'ember';

export default Ember.Route.extend({


  queryParams: {
    collectionType: {
      refreshModel: true
    },
    unitId: {
      refreshModel: true
    },
    lessonId: {
      refreshModel: true
    },
    courseId: {
      refreshModel: true
    }
  },

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

  model: function(params) {

    const route = this;

    const userId = route.get('session.userId');
    const criteria = {
      courseId: params.courseId,
      unitId: params.unitId,
      lessonId: params.lessonId,
      collectionType: params.collectionType
    };

    //Remove this after the integration works
    Ember.log.info(userId);
    Ember.log.info(criteria);

    return Ember.RSVP.hash({

      //Meanwhile the integration works
      //assessments: route.get('assessmentService').findAssessments(userId, criteria),
      //collectionPerformanceSummaryItems: route.get('performanceService').searchStudentCollectionPerformanceSummary(userId, criteria)
      assessments: [],
      collectionPerformanceSummaryItems: []

    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('assessments', model.assessments);
    controller.set('collectionPerformanceSummaryItems', model.collectionPerformanceSummaryItems);
  }
});
