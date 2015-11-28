import Ember from 'ember';

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
      const fromUrl = this.get("controller.fromUrl") || "/";
      this.transitionTo(fromUrl);
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
      resourceId: resourceId
    });
  },

  /**
   * @param {PlayerController} controller
   * @param {Collection} model
   */
  setupController(controller, model) {
    const collection = model.collection;

    var resource = collection.get("lastVisitedResource");
    if (model.resourceId) {
      resource = collection.getResourceById(model.resourceId);
    }

    controller.set("collection", collection);
    controller.moveToResource(resource);
  }
});
