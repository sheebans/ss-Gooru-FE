import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service("api-sdk/profile"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    const profile = this.get("profileService").findByUser(params.userId);

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
    controller.set("profile", model.profile);
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
      const controller = route.get("controller");
      //const currentMenuItem = controller.get("menuItem");
      controller.selectMenuItem(item);

      // TODO: Implement transitions
      //if (currentMenuItem !== item) {
      //  route.transitionTo('profile.' + item);
      //}
    }

  }

  // -------------------------------------------------------------------------
  // Events

});
