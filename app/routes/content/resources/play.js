import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/question
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
    var resource = this.get('questionService').readResource(params.resourceId);

    return Ember.RSVP.hash({
      resource: resource
    });
  },

  setupController(controller, model) {
    var isOwner = model.resource.get('owner') === this.get('session.userId');

    model.resource.children = model.resource.children.map(function (unit) {
      // Wrap every unit inside of a builder item
      return BuilderItem.create({
        data: unit
      });
    });

    controller.set('resource', model.resource);
    controller.set('isOwner', isOwner);
  }

});
