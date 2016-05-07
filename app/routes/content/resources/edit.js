import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    collectionId:{}
  },
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/resource
   */
  resourceService: Ember.inject.service("api-sdk/resource"),
  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service('api-sdk/collection'),

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Events
  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('collectionId', undefined);
      controller.set('isCollection', undefined);
    }
  },



  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var resource = this.get('resourceService').readResource(params.resourceId);

    var collection = null;

    if(params.collectionId){
      collection = this.get('collectionService').readCollection(params.collectionId);
    }
    return Ember.RSVP.hash({
      resource: resource,
      collection:collection
    });
  },

  setupController(controller, model) {
    controller.set('resource', model.resource);
    controller.set('collection', model.collection);
  }

});
