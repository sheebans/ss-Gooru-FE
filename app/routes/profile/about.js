import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Methods

  model() {
    let route = this;
    return {
      profile: route.modelFor('profile').profile
    };
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.get('parentController').selectMenuItem('about');
    controller.set('profile', model.profile);
  }
});
