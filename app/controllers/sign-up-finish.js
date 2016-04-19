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
      //to do
      console.log('next');
    },

    countrySelect: function(id){
      var controller = this;
      var countries = this.get('countries');
      var countryCode = countries.findBy("id", id).code;
      if (countryCode==='US') {
        controller.set('showStates', true);
      }
      else {
        controller.set('showStates', false);
        controller.set('districts', null);
      }
    },

    stateSelect: function(id){
     var controller = this;
      controller.set('districts', null);

      controller.get("lookupService").readDistricts(id)
        .then(function(districts) {
           controller.set('districts', districts);
        });
    },

    districtSelect: function(id){

      //to do
      console.log(id);
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
   * List of states
   * @property {States[]}
   */

  states: null,

  /**
   * showStates
   * @property {Boolean}
   */

  showStates: false,

  /**
   * List of districts
   * @property {Districts[]}
   */

  districts: null

  // -------------------------------------------------------------------------
  // Methods
});
