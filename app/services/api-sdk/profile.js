import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SessionMixin from '../../mixins/session';

/**
 * Service to support the Profile CRUD operations
 *
 * @typedef {Object} ProfileService
 */
export default Ember.Service.extend(StoreMixin, SessionMixin, {

  /**
   * Creates a new user account
   *
   * @param profileData object with the profile data
   * @returns {Promise}
   */
  createProfile: function(profileData) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedProfileData = service.get('profileSerializer').serializeCreateProfile(profileData);
      service.get('profileAdapter').createProfile({
        body: serializedProfileData
      }).then(function(response) {
        resolve(service.get('profileSerializer').normalizeCreateProfile(response));
      }, function(error) {
        reject(error);
      });
    });
  },

  /**
   * Gets the current user Profile information
   *
   * @returns {Promise}
   */
  readMyProfile: function() {
    console.log('Calling readMyProfile()...');
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').readMyProfile()
        .then(function(response) {
          console.log('Adapter response', response);
          resolve(service.get('profileSerializer').normalizeReadProfile(response));
        }, function(error) {
          console.log('Error: ', error);
          reject(error);
        });
    });
  },

  /**
   * Updates the current user Profile information
   *
   * @param profile
   * @returns {Ember.RSVP.Promise}
   */
  updateMyProfile: function(profile) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let serializedProfile = service.get('profileSerializer').serializeUpdateProfile(profile);
      service.get('profileAdapter').updateMyProfile({
        body: serializedProfile
      }).then(function() {
        resolve();
      }, function(error) {
        reject(error);
      });
    });
  },


  //
  // TODO The following functions must be deleted once API 3.0 integration is done
  //
  findByCurrentUser: function() {
    if (!this.get('session.isAnonymous')) {
      var currentProfileId = this.get('session.userId');
      return this.findById(currentProfileId);
    }
    return null;
  },

  /**
   * Find a user profile by user id
   * @param {string} userId
   * @returns {Profile}
   */
  findByUser: function(userId) {
    //TODO implement, for now it returns the current user
    Ember.Logger.log(userId);
    return this.findByCurrentUser();
  },

  findById: function(profileId) {
    return this.get('store').findRecord('profile', profileId);
  }

});
