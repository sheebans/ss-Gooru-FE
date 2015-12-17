import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),

  /**
   * @requires service:api-sdk/course-location
   */
  courseLocationService: Ember.inject.service("api-sdk/course-location"),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} collectionId - Identifier for a collection or assessment
     */
    playItem: function(collectionId){
      this.transitionTo('player', collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function () {
    const classController = this.controllerFor('class');
    var userLocation;

    if (classController.isStudent) {
      // Get the user location in a course only if the user is enrolled
      // as a student for the course
      userLocation = this.get("courseLocationService").findOneByUser(this.get('session.userId'));
    } else {
      userLocation = Ember.RSVP.resolve('');
    }

    return Ember.RSVP.hash({
      userLocation: userLocation
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function (controller, model) {
    var userLocation = (Ember.typeOf(model.userLocation) === 'instance') ?
    model.userLocation.get('unit') + '+' +
    model.userLocation.get('lesson') + '+' +
    model.userLocation.get('collection') : model.userLocation;

    controller.set('userLocation', userLocation);

    this.send('selectMenuItem', 'overview', false);
  }
});
