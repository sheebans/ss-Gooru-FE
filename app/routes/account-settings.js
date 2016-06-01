import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    let route = this;
    let profile = null;
    let userId = params.userId;

    if (userId) {
      profile = route.get('profileService').readUserProfile(params.userId);
    }

    return Ember.RSVP.hash({
      profile: profile
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('profile', model.profile);
  }

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

});