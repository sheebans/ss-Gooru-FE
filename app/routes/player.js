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
   * @property {Ember.Service} Service to rate a resource
   */
  ratingService: Ember.inject.service("api-sdk/rating"),

  /**
   * @param {{ collectionId: string, resourceId: string }} params
   */
  model(params) {
    const
      collectionId = params.collectionId,
      resourceId = params.resourceId,
      collection = this.get("collectionService").findById(collectionId),
      rating = (resourceId ? this.get('ratingService').findRatingForResource(resourceId) : null);

    return Ember.RSVP.hash({
      collection: collection,
      resourceId: resourceId,
      rating: rating
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

    const rating = model.rating;
    var ratingScore = 0;
    if (rating) {
      ratingScore = rating.get('score');
    }

    controller.set("collection", collection);
    controller.set("resource", resource);
    controller.set("resourceId", resource.get("id"));
    controller.set('ratingScore', ratingScore);
  }
});
