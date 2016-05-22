import Ember from "ember";
import Context from 'gooru-web/models/result/context';

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  performanceService: Ember.inject.service("api-sdk/performance"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    selectAttempt: function(attempt){
      const session = this.get("completedSessions")[attempt-1];
      this.loadSession(session);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Collection}
   */
  assessment: null,

  /**
   * @property {AssessmentResult}
   */
  assessmentResult: null,

  /**
   * @property {UserSession[]}
   */
  completedSessions: [],

  /**
   * @property {Context}
   */
  context: null,

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  loadSession: function (session) {
    const controller = this;

    //Setting new content if we have some session opened
    const context = controller.get("context");
    context.set("sessionId", session.sessionId);

    controller.get("performanceService")
      .findAssessmentResultByCollectionAndStudent(context)
      .then(function (assessmentResult) {
        assessmentResult.merge(controller.get("assessment"));
        assessmentResult.set("totalAttempts", controller.get("completedSessions.length")); //TODO this is comming wrong from BE
        controller.set("assessmentResult", assessmentResult);
    });
  },

  resetValues: function () {
    this.set("assessmentResult", null);
    this.set("completedSessions", []);
    this.set("context", null);
  }

});
