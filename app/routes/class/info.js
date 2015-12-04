import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {UserService} Service to retrieve user information
   */
  userService: Ember.inject.service("api-sdk/user"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },
  /**
   * Get model for the controller
   */
  model: function() {
    var id= this.paramsFor('class').classId;
    return  this.get("userService").findMembersByClass(id);
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("students", model);
    this.send("selectMenuItem", 'info', false);
  }
});
