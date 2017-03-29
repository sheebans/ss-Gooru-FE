import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller) {
    controller.loadData();
  },

  deactivate: function () {
    this.get('controller').resetValues();
  }
});
