import Ember from "ember";

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default Ember.Controller.extend({

  queryParams: ["type"],

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
  collection: null,

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

  /**
   * @property {Lesson}
   */
  lesson: null,

  /**
   * @property {string} indicates if it is collection or assessment
   */
  type: null,

  /**
   * indicates if it is assessment type
   * @property {boolean}
   */
  isAssessment: Ember.computed.equal("type", "assessment"),

  /**
   * indicates if it is collection type
   * @property {boolean}
   */
  isCollection: Ember.computed.not("isAssessment"),

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
        assessmentResult.merge(controller.get("collection"));
        assessmentResult.set("totalAttempts", controller.get("completedSessions.length")); //TODO this is comming wrong from BE
        controller.set("assessmentResult", assessmentResult);
    });
  },

  resetValues: function () {
    this.set("assessmentResult", null);
    this.set("completedSessions", []);
    this.set("context", null);
    this.set("lesson", null);
    this.set("type", null);
  }

});
