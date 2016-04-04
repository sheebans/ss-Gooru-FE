import Ember from 'ember';
import User from 'gooru-web/models/profile/profile';

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
            .signInWithUser(user, controller.get('useApi3'))
            .then(function() {
              // Trigger action in parent
              controller.send('signIn');
            })
            .catch((reason) => {
              if(reason.status===404 || reason.status===401){
                controller.get("notifications").error(errorMessage);
              }
            });
        }
        console.log('val',validations.get('isValid'));
        controller.set('didValidate', true);
      });
    }
  },

  modelSetup: Ember.on('init', function () {
    this._super(...arguments);
    Ember.$('document').ready(function () {
      console.log( "input!", Ember.$('.gru-input.username input').val());

    });
    //var user = User.create(Ember.getOwner(this).ownerInjection(), {username: 'x', password: 'c'});
    //this.set('user', user);
    }),


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Course} course
   */
  user: null,

  target: null,

  useApi3: true


});
