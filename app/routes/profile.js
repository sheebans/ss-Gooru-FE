import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  networkService: Ember.inject.service('api-sdk/network'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    let profile = null;
    let network = null;
    let userId = params.userId;

    if (userId) {
      if (userId === 'me') {
        profile = this.get('profileService').readMyProfile();
        network = this.get('networkService').readMyNetwork();
      } else {
        profile = this.get('profileService').findById(params.userId);
      }
    }

    return Ember.RSVP.hash({
      profile: profile,
      network: network
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    model.profile.set('network', model.network);
    controller.set('profile', model.profile);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item){
      const route = this;
      const controller = route.get('controller');
      const currentMenuItem = controller.get('menuItem');
      controller.selectMenuItem(item);

      if (currentMenuItem !== item) {
        route.transitionTo('profile.' + item);
      }
    }

  }

  // -------------------------------------------------------------------------
  // Events

});
