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
      var controller = this;
      var role = controller.get('profile.role');
      var countrySelected =  controller.get('countrySelected');
      var stateSelected =  controller.get('stateSelected');
      var districtSelected =  controller.get('districtSelected');
      var otherDistrict =  $.trim(controller.get('otherDistrict'));
      var showRoleErrorMessage = false;
      var showCountryErrorMessage = false;
      var showStateErrorMessage = false;
      var showDistrictErrorMessage = false;

      controller.set('otherDistrict', otherDistrict);

      if(!role){
        showRoleErrorMessage = true;
      }
      if(!countrySelected){
        showCountryErrorMessage = true;
      }

      if(!stateSelected){
        showStateErrorMessage = true;
      }

      if((!otherDistrict && otherDistrict=== '') && stateSelected && !districtSelected){
        showDistrictErrorMessage = true;
      }

      controller.set('showRoleErrorMessage', showRoleErrorMessage);
      controller.set('showCountryErrorMessage', showCountryErrorMessage);
      controller.set('showStateErrorMessage', showStateErrorMessage);
      controller.set('showDistrictErrorMessage', showDistrictErrorMessage);
    },

    countrySelect: function(id){
      var controller = this;
      var countries = this.get('countries');
      var countryCode = countries.findBy("id", id).code;

      controller.set('showCountryErrorMessage', false);
      controller.set('countrySelected', id);

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

      controller.set('showStateErrorMessage', false);
      controller.set('showDistrictErrorMessage', false);
      controller.set('districts', null);
      controller.set('stateSelected', id);
      controller.get("lookupService").readDistricts(id)
        .then(function(districts) {
           controller.set('districts', districts);
        });
    },

    districtSelect: function(id){
      var controller = this;

      controller.set('showDistrictErrorMessage', false);
      controller.set('districtSelected', id);
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
   * countrySelected
   * @property {String}
   */

  countrySelected: null,

  /**
   * stateSelected
   * @property {String}
   */

  stateSelected: null,

  /**
   * districtSelected
   * @property {String}
   */

  districtSelected: null,

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

  districts: null,

  /**
   * @type {String} teacher, student or other, tells the component which radio is checked.
   */
  currentRole:  Ember.computed.alias('profile.role'),

  /**
   * showRoleErrorMessage
   * @property {Boolean}
   */
  showRoleErrorMessage: false,

  /**
   * showCountryErrorMessage
   * @property {Boolean}
   */
  showCountryErrorMessage: false,

  /**
   * showCountryErrorMessage
   * @property {Boolean}
   */
  showDistrictErrorMessage: false

  // -------------------------------------------------------------------------
  // Methods
});
