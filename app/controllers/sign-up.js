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

    authenticate: function() {
        const controller = this;
        const user = controller.get('user');

        controller.get("notifications").clear();
        controller.get("notifications").setOptions({
          positionClass: 'toast-top-full-width sign-in'
        });

        // TODO remove this line and get dateOfBirth from component
        user.set('dateOfBirth', '11/12/1987');
        user.validate().then(function ({ model, validations }) {
          if (validations.get('isValid')) {
            controller.get("profileService").createProfile(user)
              .then(function(user){
                  controller.get("sessionService")
                    .signUp(user).then(function(){
                      controller.transitionToRoute('/user');
                    });
              });
          }
          controller.set('didValidate', true);
      });
    }
  },

  init() {
    this._super(...arguments);
    var user = User.create(Ember.getOwner(this).ownerInjection(), {username: null, password: null});
    var birthDays = [];
    var birthYears = [];

    var currentTime = new Date();

    // returns the current year (four digits)
    var year = currentTime.getFullYear();

    for (let d = 1; d <= 31; d++) {
      birthDays.push(d);
    }

    for (let y = 1900; y <= year; y++) {
      birthYears.push(y);
    }

    this.set('user', user);
    this.set('birthDays', birthDays);
    this.set('birthYears', birthYears);

    Ember.run.schedule("afterRender",this,function() {
      $('.selectpicker').selectpicker();
    });
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('birthDays', null);
    this.set('birthYears', null);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {User} user
   */
  user: null,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false
});
