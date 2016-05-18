import Ember from 'ember';
import User from 'gooru-web/models/forgot-password';

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
      const user = controller.get('user');

      if(controller.get('didValidate') === false) {
        var email = Ember.$('.gru-input-mixed-validation.email input').val();
        user.set('email',email);
        user.set('emailAsync',email);
      }

      user.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          controller.get("profileService")
            .forgotPassword(user.get('email'))
            .then(function() {
              controller.set('didValidate', true);
              controller.set('showSecondStep', true);
            });
        } else {
          controller.set('submitFlag', true);
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
    var user = User.create(Ember.getOwner(this).ownerInjection(), {email: null, emailAsync: null});

    controller.set('user', user);
    controller.set("showSecondStep", false);
    controller.set('didValidate', false);
    controller.set('submitFlag', true);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {User} user
   */
  user: null,

  /**
   * Submit has been performed
   * @property {Boolean}
   */
  submitFlag: true,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false,

  /**
   * @param {Boolean } showSecondStep - value used to check if Second Step is showing or not
   */
  showSecondStep: false

});
