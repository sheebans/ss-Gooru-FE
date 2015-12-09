import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller,model) {
    this.send("selectMenuItem", 'overview', false);
  }
});
