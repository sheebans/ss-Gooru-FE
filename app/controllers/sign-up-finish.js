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
   * @property {Ember.Service} Service to do retrieve states, districts
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    next: function() {

      console.log('next');

      //const controller = this;
      //const profile = controller.get('profile');
      //const validDate = controller.validDateSelectPicker();
      //profile.validate().then(function ({model, validations}) {
      //  if (validations.get('isValid') && validDate!=='') {
      //    profile.set('dateOfBirth', validDate);
      //    controller.get("profileService").createProfile(profile)
      //      .then(function(profile){
      //        controller.get("sessionService")
      //          .signUp(profile).then(function(){
      //          // Trigger action in parent
      //          controller.send('signUp');
      //        });
      //      });
      //  }
      //  controller.set('didValidate', true);
      //});
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
      role: null,
      countryId: null,
      stateId: null
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

  /**
   * List of countries
   * @property {Countries[]}
   */

  countries: null,

  /**
   * List of countries
   * @property {States[]}
   */

  states: null,

  /**
   * List of countries
   * @property {Districts[]}
   */

  districts: null,
  optionSelected: null,

  countrySelected2: Ember.computed('optionSelected', function() {
    console.log('countrySelected-finish', this.get('optionSelected'));
    return this.get('optionSelected');
  })

  // -------------------------------------------------------------------------
  // Methods
});
