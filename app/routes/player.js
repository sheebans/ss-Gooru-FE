import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  queryParams: {
    'resourceId' : {
      replace: true
    }
  },

  // -------------------------------------------------------------------------
  // Actions
  /**
   * @property {Ember.Service} Service to retrieve a Collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const
      collectionId = params.collectionId,
      resourceId = params.resourceId,
      collection = this.get("collectionService").findById(collectionId);

    return Ember.RSVP.hash({
      //collection: collectionMock,
      collection: collection,
      resourceId: resourceId
    });
  },

  /**
   * @param {PlayerController} controller
   * @param {Collection} model
   */
  setupController(controller, model) {
    this._super(controller, model);

    const collection = model.collection;

    var resource = collection.get("lastVisitedResource");
    if (model.resourceId) {
      resource = collection.getResourceById(model.resourceId);
    }

    controller.set("collection", collection);
    controller.set("resource", resource);
    controller.set("resourceId", resource.get("id"));
  }
});
