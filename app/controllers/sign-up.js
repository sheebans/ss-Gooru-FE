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

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    next: function() {

      const controller = this;
      const profile = controller.get('profile');
      const validDate = controller.validDateSelectPicker();
      profile.validate().then(function ({model, validations}) {
        if (validations.get('isValid') && validDate!=='') {
         profile.set('dateOfBirth', validDate);
         controller.get("profileService").createProfile(profile)
         .then(function(profile){
           controller.get("sessionService")
             .signUp(profile).then(function(){
             // Trigger action in parent
             controller.send('signUp');
           });
         });
        }
        controller.set('didValidate', true);
      }, function(error) {
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
