import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile'),

  /**
   * @property {Ember.Service} Service to do retrieve states, districts
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    cancel: function() {
      // Trigger action in route
      this.send('profileAboutTransition');
    },

    updateProfile: function() {
      const controller = this;
      let editedProfile = this.get('tempProfile');
      var role = controller.get('tempProfile.role');
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

        editedProfile.set('countryId', countrySelected);
        editedProfile.set('stateId', '');
        editedProfile.set('schoolDistrictId', '');

        if(otherSchoolDistrict && otherSchoolDistrict!== ''){
          editedProfile.set('schoolDistrictId', '');
          editedProfile.set('schoolDistrict', otherSchoolDistrict);
        }
        controller.get('parentController').saveProfile(editedProfile);
        controller.get('profile').merge(editedProfile, ['firstName', 'lastName', 'aboutMe', 'role', 'countryId', 'stateId', 'schoolDistrictId', 'schoolDistrict', 'country', 'state']);

        console.log('profile-merge',controller.get('profile'));
        // Trigger action in route
        this.send('profileAboutTransition');
      }
    },

    countrySelect: function(id){
      var controller = this;
      var countries = this.get('countries');
      var countryCode = countries.findBy("id", id).code;
      var countryName = countries.findBy("id", id).name;

      controller.set('showCountryErrorMessage', false);
      controller.set('countrySelected', id);
      controller.set('country', countryName);

      if (countryCode==='US') {
        controller.set('showStates', true);
      }
      else {
        controller.set('showStates', false);
        controller.set('districts', null);
        controller.set('stateSelected', '');
        controller.set('state', '');
        controller.set('districtSelected', '');
        controller.set('otherSchoolDistrict', '');
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
      controller.set('otherSchoolDistrict', '');
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * A link to the parent profile property
   * @see controllers/profile.js
   * @property {Class}
   */
  profile: Ember.computed.reads('parentController.profile'),

  /**
   * A link to the computed property isMyProfile in profile controller
   * @see controllers/profile.js
   * @property {isMyProfile}
   */
  isMyProfile: Ember.computed.reads('parentController.isMyProfile'),

  /**
   * Copy of the profile model used for editing.
   * @property {Profile}
   */
  tempProfile: null,

  /**
   * List of countries
   * @property {Countries[]}
   */

  countries: null,

  /**
   * countrySelected
   * @property {String}
   */
  country: Ember.computed.alias('tempProfile.country'),


  /**
   * countrySelected
   * @property {String}
   */
  countrySelected: Ember.computed.alias('tempProfile.countryId'),

  /**
   * stateSelected
   * @property {String}
   */
  state: Ember.computed.alias('tempProfile.state'),
  /**
   * stateSelected
   * @property {String}
   */
  stateSelected: Ember.computed.alias('tempProfile.stateId'),

  /**
   * districtSelected
   * @property {String}
   */
  districtSelected: Ember.computed.alias('tempProfile.schoolDistrictId'),

  /**
   * otherSchoolDistrict
   * @property {String}
   */
  otherSchoolDistrict: Ember.computed.alias('tempProfile.schoolDistrict'),

  /**
   * List of states
   * @property {States[]}
   */

  states: null,

  /**
   * isUSASelected
   * @property {Boolean}
   */

  //isUSASelected: Ember.computed('tempProfile.countryId', function() {
  //  var countries = this.get('countries');
  //  var countryId = this.get('tempProfile.countryId');
  //  var countryCode = countries.findBy("id", countryId).code;
  //
  //  return (countryCode==='US');
  //}),

  /**
   * showStates
   * @property {Boolean}
   */
  showStates: Ember.computed.reads('tempProfile.stateId'),

  /**
   * List of districts
   * @property {Districts[]}
   */

  districts: null,

  /**
   * @type {String} teacher, student or other, tells the component which radio is checked.
   */
  currentRole:  Ember.computed.alias('tempProfile.role'),

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

});
