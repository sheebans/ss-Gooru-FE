import Ember from 'ember';
import { COUNTRY_CODES } from "gooru-web/config/config";
import { DEFAULT_IMAGES } from 'gooru-web/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @property {Ember.Service} Service to do retrieve states, districts
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),

  /**
   * @property {Ember.Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

  /**
   * @property {Ember.Service} Media service
   */
  mediaService: Ember.inject.service("api-sdk/media"),

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service('session'),

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    cancel: function() {
      this.get('router').transitionTo('profile.about', this.get('profile.id'));
    },

    updateProfile: function() {
      const component = this;
      let profile = this.get('profile');
      let editedProfile = this.get('tempProfile');
      var role = component.get('tempProfile.role');
      var countrySelected =  component.get('countrySelected');
      var stateSelected =  component.get('stateSelected');
      var districtSelected =  component.get('districtSelected');
      var otherSchoolDistrict =  $.trim(component.get('otherSchoolDistrict'));
      var districts = component.get('districts');
      var showStates = component.get('showStates');
      var showRoleErrorMessage = false;
      var showCountryErrorMessage = false;
      var showStateErrorMessage = false;
      var showDistrictErrorMessage = false;
      var isValid = true;

      component.set('otherSchoolDistrict', otherSchoolDistrict);

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

      component.set('showRoleErrorMessage', showRoleErrorMessage);
      component.set('showCountryErrorMessage', showCountryErrorMessage);
      component.set('showStateErrorMessage', showStateErrorMessage);
      component.set('showDistrictErrorMessage', showDistrictErrorMessage);

      if(isValid){
        editedProfile.validate().then(function ({ validations }) {

          if (validations.get('isValid')) {
            let checkUsername = Ember.RSVP.resolve();
            if(editedProfile.get('username') !== profile.get('username')) {
              checkUsername= component.get('profileService').checkUsernameAvailability(editedProfile.get('username'));
            } else {
              editedProfile.set('username', null);
            }
            let imageIdPromise = new Ember.RSVP.resolve(editedProfile.get('avatarUrl'));
            if(editedProfile.get('avatarUrl') && editedProfile.get('avatarUrl') !== profile.get('avatarUrl')) {
              imageIdPromise =  component.get('mediaService').uploadUserFile(editedProfile.get('avatarUrl'));
            }
            checkUsername.then(function() {
                imageIdPromise.then(function(imageId) {
                  editedProfile.set('avatarUrl', imageId);
                  if(otherSchoolDistrict && otherSchoolDistrict!== ''){
                    editedProfile.set('schoolDistrictId', '');
                    editedProfile.set('schoolDistrict', otherSchoolDistrict);
                  }
                  return component.saveProfile(editedProfile);
                }).then(function() {
                  if(!editedProfile.get('avatarUrl')) {
                    editedProfile.set('avatarUrl', DEFAULT_IMAGES.USER_PROFILE);
                  }
                  component.get('profile').merge(editedProfile, ['username','firstName', 'lastName', 'aboutMe', 'role', 'countryId', 'stateId', 'state', 'schoolDistrictId', 'schoolDistrict', 'country', 'studentId', 'avatarUrl']);
                  component.get('router').transitionTo('profile.about', editedProfile.get('id'));
                }, function(error) {
                  var message = component.get('i18n').t('common.errors.collection-not-updated').string;
                  component.get('notifications').error(message);
                  Ember.Logger.error(error);
                });
              },function() {
                component.set('existingUsername', true);
              }
            );
          }
        });
      }
    },

    countrySelect: function(id){
      var component = this;
      var countries = this.get('countries');
      var countryCode = countries.findBy("id", id).code;
      var countryName = countries.findBy("id", id).name;

      component.set('showCountryErrorMessage', false);
      component.set('countrySelected', id);
      component.set('country', countryName);

      if (countryCode===COUNTRY_CODES.US) {
        component.set('showStates', true);
      }
      else {
        component.set('showStates', false);
        component.set('districts', null);
        component.set('stateSelected', '');
        component.set('state', '');
        component.set('districtSelected', '');
        component.set('otherSchoolDistrict', '');
      }
    },

    stateSelect: function(id){
      var component = this;

      component.set('showStateErrorMessage', false);
      component.set('showDistrictErrorMessage', false);
      component.set('districts', null);
      component.set('stateSelected', id);
      component.get("lookupService").readDistricts(id)
        .then(function(districts) {
          component.set('districts', districts);
        });
    },

    districtSelect: function(id){
      var component = this;

      component.set('showDistrictErrorMessage', false);
      component.set('districtSelected', id);
      component.set('otherSchoolDistrict', '');
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init: function() {
    this._super(...arguments);
    this.set('tempProfile', this.get('profile').copy());
    if(this.get('tempProfile.avatarUrl') === DEFAULT_IMAGES.USER_PROFILE) {
      this.get('tempProfile').set('avatarUrl', null);
    }
  },
  /**
   * DidInsertElement ember event
   */
  didInsertElement: function(){
    const component = this;
    var $username = component.$('#username input');
    $username.on("keydown", function () {
      component.set('existingUsername',false);
    });
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * A link to the parent profile property
   * @see controllers/profile.js
   * @property {Class}
   */
  profile: null,

  /**
   * Indicates if the user is seeing his own profile
   * @property {isMyProfile}
   * @see {Class} profile
   * @returns {bool}
   */
  isMyProfile: Ember.computed('profile', function() {
    return this.get('profile').get('id') === this.get("session.userId");
  }),

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
  showDistrictErrorMessage: false,

  /**
   * @type {String} existingUsername
   */
  existingUsername: false,

// -------------------------------------------------------------------------
  // Methods

  saveProfile(profile) {
    const component = this;
    return component.get('profileService').updateMyProfile(profile).then(function() {
      let session = component.get('session');
      session.set('userData.isNew', false);
      if(!profile.username){
        profile.set('username',component.get('profile.username'));
      }
      session.set('userData.username', profile.username);
      return component.get('sessionService').updateUserData(session.get('userData'));
    });
  }
});
