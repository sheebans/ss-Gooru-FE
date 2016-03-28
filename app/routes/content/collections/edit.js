import Ember from 'ember';
import Collection from 'gooru-web/models/content/collection';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },
  setupController(controller /*, model */) {

    // TODO: Fetch data from model
    var collection = Collection.create(Ember.getOwner(this).ownerInjection(), {
      title: "Collection Title",
      category: 1,
      audience: [2, 4],
      image: 'assets/gooru/default-image.png'
    });

    controller.set('collection', collection);
  }

});
