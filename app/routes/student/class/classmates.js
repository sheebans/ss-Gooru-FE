import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller) {
    controller.get('classController').selectMenuItem('classmates');
  }
});
