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
    loadSession: function(session){
      this.loadSession(session);
    }
  }

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {AssessmentResult}
   */
  assessmentResult: null,

  /**
   * @property {UserSession[]}
   */
  completedSessions: [],

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  loadSession: function (session) {
    const controller = this;

    //Setting new content if we have some session opened
    const context = Context.create({
      sessionId: session.sessionId,
      collectionType: "assessment"
    });

    controller.get("performanceService")
      .findAssessmentResultByCollectionAndStudent(context)
      .then(function (assessmentResult) {
        controller.set("assessmentResult", assessmentResult);
    });
  });
}

})
;
