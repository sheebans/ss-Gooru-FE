import Ember from 'ember';
import Profile from 'gooru-web/models/profile/profile';
import ResetPasswordValidations from 'gooru-web/validations/reset-password';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} Session service
   */
  profileService: Ember.inject.service("api-sdk/profile"),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    resetPassword: function() {
      const controller = this;
      const user = controller.get('profile');

      user.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          controller.get("profileService")
            .resetPassword(user)
            .then(function() {
              controller.set('didValidate', true);
            });
        }
      });
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * init and reset all the properties for the validations
   */

  resetProperties(){
    var controller = this;
    var resetPasswordProfile = Profile.extend(ResetPasswordValidations);
    var profile = resetPasswordProfile.create(Ember.getOwner(this).ownerInjection(), {
      password: null,
      rePassword: null
    });

    controller.set('profile', profile);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {User} user
   */
  profile: null,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false

});
