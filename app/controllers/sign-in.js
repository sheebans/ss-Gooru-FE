import Ember from 'ember';
import User from 'gooru-web/models/profile/profile';
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

      if(controller.get('didValidate')=== false){
        var username = Ember.$('.gru-input.username input').val();
        var password = Ember.$('.gru-input.password input').val();
        user.set('username',username);
        user.set('password',password);
      }

      user.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          controller.get("sessionService")
            .signInWithUser(user, controller.get('useApi3'))
            .then(function() {
              controller.set('didValidate', true);
              // Trigger action in parent
              controller.send('signIn');
            })
            .catch((reason) => {
              if(reason.status===404 || reason.status===401){
                controller.get("notifications").error(errorMessage);
              }
            });
        }
      });
    }
  },

  init(){
    this._super(...arguments);
    var user = User.create(Ember.getOwner(this).ownerInjection(), {username: null, password: null});
    this.set('user', user);
    this.set('googleSignInUrl', Env['google-sign-in'].url);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Course} course
   */
  user: null,

  target: null,

  useApi3: true,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false


});
