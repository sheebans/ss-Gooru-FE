import Ember from 'ember';
import User from 'gooru-web/models/sign-in/sign-in';
import Env from 'gooru-web/config/environment';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

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

    authenticate: function() {
      const controller = this;
      const user = controller.get('user');
      const errorMessage = controller.get('i18n').t('common.errors.sign-in-credentials-not-valid').string;

      controller.get("notifications").clear();
      controller.get("notifications").setOptions({
        positionClass: 'toast-top-full-width sign-in'
      });

      user.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          controller.get("sessionService")
            .signInWithUser(user, true)
            .then(function() {
              // Trigger action in parent
              controller.send('signIn');
            })
            .catch((reason) => {
              if(reason.status===404 || reason.status===401){
                controller.get("notifications").error(errorMessage);
              }
            });
        } else {
          controller.set('submitFlag', true);
        }
        controller.set('didValidate', true);
      });
    }
  },

  init(){
    this._super(...arguments);
    var user = User.create(Ember.getOwner(this).ownerInjection(), {username: null, usernameAsync: null, password: null});
    this.set('user', user);
    this.set('googleSignInUrl', Env['google-sign-in'].url);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {User} user
   */
  user: null,

  target: null,

  /**
   * Submit has been performed
   * @property {Boolean}
   */
  submitFlag: true,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false


});
