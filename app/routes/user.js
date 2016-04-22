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
   * @type {ClassService} Service to retrieve user information
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service("session"),

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
    let route = this;
    const myId = route.get("session.userId");
    let profilePromise = route.get('profileService').readUserProfile(myId);

    return profilePromise.then(function(profile){
      let myClasses = route.get('classService').findMyClasses(profile);
      return Ember.RSVP.hash({
        myClasses: myClasses,
        profile: profile
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */

  setupController: function(controller, model) {
    controller.set('myClasses', model.myClasses);
    controller.set('profile', model.profile);
  }

});
