import Ember from "ember";

/**
 *
 * Controls the access to the analytics data for a
 * student related to a collection of resources
 *
 */

export default Ember.Controller.extend({

  queryParams: ["classId", "courseId", "unitId", "lessonId", "collectionId", "userId", "type"],
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


  /**
   * Indicates which is the url to go back when pressing the button
   * this is usefull when comming from the player out of the context of a class
   * this needs to be improved so it works when refreshing the page
   * @property {string}
   */
  backUrl: null,

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  loadSession: function (session) {
    const controller = this;

    const context = controller.get("context");
    if (session){ //collections has no session
      context.set("sessionId", session.sessionId);
    }

    controller.get("performanceService")
      .findAssessmentResultByCollectionAndStudent(context)
      .then(function (assessmentResult) {
        assessmentResult.merge(controller.get("collection"));
        assessmentResult.set("totalAttempts", controller.get("completedSessions.length")); //TODO this is comming wrong from BE
        if (session.eventTime){
          assessmentResult.set("submittedAt", new Date(session.eventTime));
        }
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
