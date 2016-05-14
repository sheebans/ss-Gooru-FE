import Ember from 'ember';
import Profile from 'gooru-web/models/profile/profile';
import { COUNTRY_CODES } from "gooru-web/config/config";

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service("session"),

  /**
   * @property {Service} Profile service
   */
  profileService: Ember.inject.service("api-sdk/profile"),

  /**
   * @property {Ember.Service} Service to do retrieve states, districts
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service('api-sdk/session'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    next: function() {
      var controller = this;
      var userId = controller.get("session.userId");
      var profile = controller.get("profile");
      var role = controller.get('profile.role');
      var countrySelected =  controller.get('countrySelected');
      var stateSelected =  controller.get('stateSelected');
      var districtSelected =  controller.get('districtSelected');
      var otherSchoolDistrict =  $.trim(controller.get('otherSchoolDistrict'));
      var districts = controller.get('districts');
      var showStates = controller.get('showStates');
      var showRoleErrorMessage = false;
      var showCountryErrorMessage = false;
      var showStateErrorMessage = false;
      var showDistrictErrorMessage = false;
      var isValid = true;

      profile.set('id', userId);
      controller.set('otherSchoolDistrict', otherSchoolDistrict);

      if(!role){
        showRoleErrorMessage = true;
        isValid = false;
      }
      if(!countrySelected){
        showCountryErrorMessage = true;
        isValid = false;
      }

      if(!stateSelected && showStates){
        showStateErrorMessage = true;
        isValid = false;
      }

      if((!otherSchoolDistrict && otherSchoolDistrict=== '') && stateSelected && !districtSelected && districts && districts.length>0){
        showDistrictErrorMessage = true;
        isValid = false;
      }

      controller.set('showRoleErrorMessage', showRoleErrorMessage);
      controller.set('showCountryErrorMessage', showCountryErrorMessage);
      controller.set('showStateErrorMessage', showStateErrorMessage);
      controller.set('showDistrictErrorMessage', showDistrictErrorMessage);

      if(isValid){
        if(otherSchoolDistrict && otherSchoolDistrict!== ''){
          profile.set('schoolDistrictId', null);
          profile.set('schoolDistrict', otherSchoolDistrict);
        }
        controller.get('profileService').updateMyProfile(profile)
          .then(function() {
            let session = controller.get('session');
            session.set('userData.isNew', false);
            controller.get('sessionService').updateUserData(session.get('userData'));
            controller.send('signUpFinish', role);
          }, function() {
            Ember.Logger.error('Error updating user');
          });
      }
   },

    countrySelect: function(id){
      var controller = this;
      var countries = this.get('countries');
      var countryCode = countries.findBy("id", id).code;

      controller.set('showCountryErrorMessage', false);
      controller.set('countrySelected', id);

      if (countryCode===COUNTRY_CODES.US) {
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
      controller.set('otherSchoolDistrict', null);
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
      stateId: null,
      schoolDistrictId: null,
      schoolDistrict: null
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

  countrySelected: Ember.computed.alias('profile.countryId'),

  /**
   * stateSelected
   * @property {String}
   */

  stateSelected: Ember.computed.alias('profile.stateId'),

  /**
   * districtSelected
   * @property {String}
   */
  districtSelected: Ember.computed.alias('profile.schoolDistrictId'),

  /**
   * otherSchoolDistrict
   * @property {String}
   */
  otherSchoolDistrict: null,

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
