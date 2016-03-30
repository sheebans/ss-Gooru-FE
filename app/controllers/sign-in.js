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
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    authenticate: function() {
      var controller = this;
      const user = controller.get('user');
      console.log('user',user);
      user.validate().then(function ({ model, validations }) {
        console.log('validations',validations.get('isValid'));
        if (validations.get('isValid')) {

        }
      })

      toastr.clear();
      //controller.get("sessionService")
      //  .signInWithUser(controller.get("credentials"), controller.get('useApi3'))
      //  .then(function() {
      //    // Trigger action in parent
      //    controller.send('signIn');
      //  })
      //  .catch((reason) => {
      //   if(reason.status===404){
      //     const message = this.get('i18n').t('common.errors.sign-in-credentials-not-valid').string;
      //     toastr.options = {
      //       positionClass : 'toast-top-full-width sign-in'
      //     };
      //     toastr.error(message);
      //   }
      //
      //  });
    }
  },

  init() {
    this._super(...arguments);
    var user = User.create(Ember.getOwner(this).ownerInjection(), {username: null, password: null});
    this.set('user', user);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} authentication error message
   */
  errorMessage: null,

  /**
   * Object with credentials for signing in
   *
   * @type {Ember.Object}
   */
  credentials: Ember.Object.create({
    username: null,
    password: ''
  }),

  /**
   * @type {Course} course
   */
  user: null,

  target: null,

  useApi3: true


});
