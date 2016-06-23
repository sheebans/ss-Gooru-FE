import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import EditResourceValidations from 'gooru-web/validations/edit-resource';
import Resource from 'gooru-web/models/content/resource';

export default Ember.Route.extend(PrivateRouteMixin, {
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

  model: function (params) {
    let route = this;
    var resource = route.get('resourceService').readResource(params.resourceId).then(function(resource){
      var EditResourceValidation = Resource.extend(EditResourceValidations);
      var editResource = EditResourceValidation.create(Ember.getOwner(route).ownerInjection());
      editResource.merge(resource, resource.modelProperties());
      return editResource;
    });

    var isEditing = params.editing;

    var collection = null;

    if(params.collectionId){
      collection = route.get('collectionService').readCollection(params.collectionId);
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
