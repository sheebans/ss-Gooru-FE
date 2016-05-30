import Ember from 'ember';
import Profile from 'gooru-web/models/profile/profile';
import EditProfileValidations from 'gooru-web/validations/edit-profile';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  /**
   * Get model for the controller
   */
  model: function(params) {
    let route = this;
    let userId = params.userId;

    if (userId) {
      return route.get('profileService').readUserProfile(params.userId)
        .then(function(profile) {
          var ProfileValidation = Profile.extend(EditProfileValidations);
          var editProfile = ProfileValidation.create(Ember.getOwner(route).ownerInjection());
          editProfile.merge(profile, profile.modelProperties());
          return Ember.RSVP.hash({
            profile: editProfile
          });
        });
    }

    return Ember.RSVP.hash({
      profile: null
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('profile', model.profile);
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
      const controller = route.get('controller');
      const currentMenuItem = controller.get('menuItem');
      controller.selectMenuItem(item);

      if (currentMenuItem !== item) {
        if (item === 'content'){
          route.transitionTo('profile.' + item + '.courses');
        }else if (item === 'network'){
          route.transitionTo('profile.' + item + '.following');
        }
        else {
          route.transitionTo('profile.' + item);
        }
      }
    }

  }

  // -------------------------------------------------------------------------
  // Events

});
