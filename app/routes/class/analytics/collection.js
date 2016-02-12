import Ember from 'ember';

/**
 *
 * Analytics data for a class related to a collection of resources
 * Gathers and passes the initialization information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  }
});
