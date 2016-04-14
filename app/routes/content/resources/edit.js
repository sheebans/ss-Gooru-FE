import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/resource
   */
  resourceService: Ember.inject.service("api-sdk/resource"),

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var resource = this.get('resourceService').readResource(params.resourceId);

    return Ember.RSVP.hash({
      resource: resource
    });
  },

  setupController(controller, model) {
    controller.set('resource', model.resource);
  }

});
