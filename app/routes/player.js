import Ember from 'ember';
import AssessmentResult from 'gooru-web/models/result/assessment';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

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
   * @property {Ember.Service} Service to retrieve a Collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  // -------------------------------------------------------------------------
  // Methods
  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const
      collectionId = params.collectionId,
      resourceId = params.resourceId,
      collection = this.get("collectionService").findById(collectionId);

    return Ember.RSVP.hash({
      collection: collection,
      resourceId: resourceId,
      assessmentResult: null //TODO load it from analytics so it can be resumed
    });
  },

  /**
   * @param {PlayerController} controller
   * @param {Collection} model
   */
  setupController(controller, model) {
    const collection = model.collection;
    let assessmentResult = model.assessmentResult;

    let promise = Ember.RSVP.resolve(true);
    if (!assessmentResult){
      assessmentResult = AssessmentResult.create();
      assessmentResult.initAssessmentResult(collection);
      promise = controller.startAssessment();
    }

    promise.then(function(){
      controller.set("assessmentResult", assessmentResult);

      var resource = collection.get("lastVisitedResource");
      if (model.resourceId) {
        resource = collection.getResourceById(model.resourceId);
      }

      controller.set("collection", collection);
      controller.moveToResource(resource);
    });
  }
});
