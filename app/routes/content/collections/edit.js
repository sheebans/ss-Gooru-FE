import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';

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
    //var course = this.get('courseService').fetchById(params.courseId);

    // TODO: Remove once courseService#fetchById method is implemented
    var collection = Collection.create(Ember.getOwner(this).ownerInjection(), {
      id: params.collectionId,
      category: 1,
      audience: [2, 4]
    });

    return Ember.RSVP.hash({
      collection: collection
    });
  },

  setupController(controller, model) {

    controller.set('collection', model.collection);
  }

});
