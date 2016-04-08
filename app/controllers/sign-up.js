import Ember from 'ember';
import Profile from 'gooru-web/models/profile/profile';

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

    next: function() {

      //const controller = this;
      //const user = controller.get('user');
      //
      //controller.get("notifications").clear();
      //controller.get("notifications").setOptions({
      //  positionClass: 'toast-top-full-width sign-in'
      //});
      //
      //// TODO remove this line and get dateOfBirth from component
      //user.set('dateOfBirth', '11/12/1987');
      //user.validate().then(function ({ model, validations }) {
      //  if (validations.get('isValid')) {
      //    controller.get("profileService").createProfile(user)
      //      .then(function(user){
      //        controller.get("sessionService")
      //          .signUp(user).then(function(){
      //          controller.transitionToRoute('/user');
      //        });
      //      });
      //  }
      //  controller.set('didValidate', true);
      //
        const controller = this;
      const profile = controller.get('profile');
      const validDate = controller.validDateSelectPicker();
      profile.validate().then(function ({model, validations}) {
       if (validations.get('isValid') && validDate!=='') {
         profile.set('dayOfBirth', validDate);
         console.log('save');
          //to do
        }
        controller.set('didValidate', true);
      });
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * init event
   */
  init() {
    this._super(...arguments);
    var profile = Profile.create(Ember.getOwner(this).ownerInjection(), {
                  username: null,
                  password: null,
                  firstName: null,
                  lastName: null,
                  email: null
                });
    this.set('profile', profile);
  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('profile', null);
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Profile} profile
   */
  profile: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * validate Date SelectPicker
   * @returns {Boolean}
   */
  validDateSelectPicker: function(){
    var monthSelected = $('.selectpicker.months option:selected').val();
    var daySelected = $('.selectpicker.days option:selected').val();
    var yearSelected = $('.selectpicker.years option:selected').val();
    var birthDayDate = '';

    if (monthSelected || daySelected || yearSelected){
      birthDayDate = monthSelected +'/'+ daySelected +'/'+ yearSelected;
    }

    return birthDayDate;
  }
});
