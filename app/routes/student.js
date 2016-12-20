import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Student route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {

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


  /**
   * @type {I18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function() {
    let route = this;
    const myId = route.get("session.userId");
    let profilePromise = route.get('profileService').readUserProfile(myId);

    return profilePromise.then(function(profile){
      return Ember.RSVP.hash({
        applicationModel: route.modelFor('application'),
        applicationController: route.controllerFor('application'),
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
    controller.set('profile', model.profile);
  }

});
