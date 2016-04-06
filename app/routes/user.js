import Ember from 'ember';

/**
 * User route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend( {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {Ember.Service} Service to retrieve user information
   */
  classService: Ember.inject.service("api-sdk/class"),
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions

  actions:{
    switchTab: function () {
      $('.nav-tabs li.tab:not(.active)').tab('show');
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function() {

  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller/*, model*/) {
    controller.set("totalJoinedClasses", 2);
    controller.set("totalTeachingClasses", 1);
  }

});
