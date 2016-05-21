import Ember from 'ember';
import Context from 'gooru-web/models/result/context';
/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  userSessionService: Ember.inject.service("api-sdk/user-session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * @param {{ assessmentId: string, resourceId: string }} params
   */
  model(params) {
    const route = this;
    const context = route.getContext(params);

    return Ember.RSVP.hash({
      completedSessions : route.get("userSessionService").getCompletedSessions(context),
      context: context
    })
  },

  /**
   *
   * @param controller
   * @param model
   * @returns {Promise.<T>}
   */
  setupController: function(controller, model){
    var completedSessions = model.completedSessions;
    const totalSessions = completedSessions.length;
    const lastCompletedSession = completedSessions[totalSessions - 1];
    controller.set("completedSessions", completedSessions);
    controller.set("context", model.context);
    controller.loadSession(lastCompletedSession);
  },

  /**
   * Get the player context
   * @param params
   * @returns {Context}
   */
  getContext: function(params){
    const route = this;
    const userId = route.get('session.userId');
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    return Context.create({
      collectionType: "assessment",
      userId: userId,
      collectionId: collectionId,
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId
    });
  }


});
