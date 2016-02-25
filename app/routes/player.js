import Ember from 'ember';
import AssessmentResult from 'gooru-web/models/result/assessment';
import Context from 'gooru-web/models/result/context';
import {generateUUID} from 'gooru-web/utils/utils';

/**
 * @typedef { Ember.Route } PlayerRoute
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
  actions:{
    /**
     * When closing the player
     */
    closePlayer: function(){
      var route = !this.get('history.lastRoute.name') ? 'index' : this.get('history.lastRoute.url');
      this.transitionTo(route);
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Ember.Service} Service to rate a resource
   */
  ratingService: Ember.inject.service("api-sdk/rating"),

  /**
   * @property {Ember.Service} Service to retrieve a collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @property {Ember.Service} Service to retrieve an assessment result
   */
  performanceService: Ember.inject.service("api-sdk/performance"),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const userId = this.get('session.userId');
    const collectionId = params.collectionId;
    const resourceId = params.resourceId;
    const collection = this.get("collectionService").findById(collectionId);
    const context = Context.create({
      userId: userId,
      collectionId: collectionId,
      parentEventId: generateUUID(), //parent event id for all events in this session
      collectionType: collection.get("collectionType")
    });

    const assessmentResult = (userId) ?
      this.get("performanceService").findAssessmentResultByCollectionAndStudent(collectionId, userId) : null;


    return Ember.RSVP.hash({
      collection: collection,
      resourceId: resourceId,
      assessmentResult: assessmentResult,
      context: context
    });
  },

  /**
   * @param {PlayerController} controller
   * @param {Collection} model
   */
  setupController(controller, model) {
    const collection = model.collection;
    let assessmentResult = model.assessmentResult;

    if (!assessmentResult){
      assessmentResult = AssessmentResult.create({
        totalAttempts: 1,
        sessionId: generateUUID(), //sessionId for new assessment
        selectedAttempt: 1,
        resourceResults: Ember.A([])
      });
    }
    assessmentResult.merge(collection);

    model.context.set("sessionId", assessmentResult.get("sessionId"));

    controller.set("context", model.context);
    controller.set("assessmentResult", assessmentResult);
    controller.set("showReport", assessmentResult.get("submitted"));

    controller.startAssessment();
    var resource = collection.get("lastVisitedResource");
    if (model.resourceId) {
      resource = collection.getResourceById(model.resourceId);
    }

    controller.set("collection", collection);
    controller.moveToResource(resource);
  }
});
