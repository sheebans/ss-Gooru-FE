import Ember from 'ember';
import UserResourcesResult from 'gooru-web/models/result/user-resources'
import QuestionResult from 'gooru-web/models/result/question'
import ResourceResult from 'gooru-web/models/result/resource'

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
      collection = this.get("collectionService").findById(collectionId),
      userResourcesResult = UserResourcesResult.create({
        user: 1,
        resourceResults: Ember.A([])
      }); //TODO load UserQuestionsResult

    return Ember.RSVP.hash({
      collection: collection,
      resourceId: resourceId,
      userResourcesResult: userResourcesResult
    });
  },

  /**
   * @param {PlayerController} controller
   * @param {Collection} model
   */
  setupController(controller, model) {
    const collection = model.collection;
    const userResourcesResult = model.userResourcesResult;

    this.generateResourceResults(userResourcesResult);
    this.set("userResourcesResult", userResourcesResult);

    var resource = collection.get("lastVisitedResource");
    if (model.resourceId) {
      resource = collection.getResourceById(model.resourceId);
    }

    controller.set("collection", collection);
    controller.moveToResource(resource);
  },

  /**
   * Creates a result for each resource if it doesn't exist already
   * @param {UserResourcesResult} userResourcesResult
   */
  generateResourceResults: function(userResourcesResult){
    const resourceResults = userResourcesResult.get("resourceResults");
    let resources = collection.get("resources");
    resources.forEach(function(resource){
      let resourceId = resource.get('id');
      let found = resourceResults.filterBy("resourceId", resourceId).get("length");
      if (!found){
        let result = (resource.get("isQuestion")) ?
          QuestionResult.create({ resourceId: resourceId, resource: resource }) :
          ResourceResult.create({ resourceId: resourceId, resource: resource });
        resourceResults.addObject(result);
      }
    });
  }
});
