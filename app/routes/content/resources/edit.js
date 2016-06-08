import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    collectionId:{},
    editing:{}
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
  resetController(controller, isExiting) {
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
    var isEditing = params.editing;

    var collection = null;

    if(params.collectionId){
      collection = this.get('collectionService').readCollection(params.collectionId);
    }
    return Ember.RSVP.hash({
      resource: resource,
      collection:collection,
      isEditing: !!isEditing
    });
  },

  setupController(controller, model) {
    var resource = model.resource;

    controller.set('resource', resource);
    controller.set('collection', model.collection);
    controller.set('isEditing', model.isEditing);
    if(model.isEditing) {
      controller.set('tempResource', resource.copy());
    }
  }
});
