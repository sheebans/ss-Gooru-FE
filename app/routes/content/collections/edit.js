import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  collectionService: Ember.inject.service('api-sdk/collection'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var collection = this.get('collectionService').readCollection(params.collectionId);

    return Ember.RSVP.hash({
      collection: collection
    });
  },

  setupController(controller, model) {

    controller.set('collection', model.collection);
  }

});
