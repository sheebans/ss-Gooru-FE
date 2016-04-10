import Ember from 'ember';
import ProfileSerializer from 'gooru-web/serializers/profile/profile';
import ProfileAdapter from 'gooru-web/adapters/profile/profile';

/**
 * Service to support the Profile CRUD operations
 *
 * @typedef {Object} ProfileService
 */
export default Ember.Service.extend({

  session: Ember.inject.service(),

  store: Ember.inject.service(),

  profileSerializer: null,

  profileAdapter: null,


  init: function () {
    this._super(...arguments);
    this.set('profileSerializer', ProfileSerializer.create());
    this.set('profileAdapter', ProfileAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

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

  /**
   * Gets the user Profile information of a given user id
   *
   * @returns {Promise}
   */
  readUserProfile: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').readUserProfile(userId)
        .then(function(response) {
          resolve(service.get('profileSerializer').normalizeReadProfile(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  /**
   * Follows a user profile
   * @param userId
   * @returns {Ember.RSVP.Promise}
   */
  followUserProfile: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').followUserProfile(userId)
        .then(function() {
          resolve();
        }, function(error) {
          reject(error);
        });
    });
  },

  /**
   * Unfollows a user profile
   * @param userId
   * @returns {Ember.RSVP.Promise}
   */
  unfollowUserProfile: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').unfollowUserProfile(userId)
        .then(function() {
          resolve();
        }, function(error) {
          reject(error);
        });
    });
  },

  //
  // TODO The following functions must be deleted once API 3.0 integration is done
  //
  findById: function(profileId) {
    return this.get('store').findRecord('profile', profileId);
  },

  findByCurrentUser: function() {
    if (!this.get('session.isAnonymous')) {
      var currentProfileId = this.get('session.userId');
      return this.findById(currentProfileId);
    }
    return null;
  },

  /**
   * Return the list of resources related to a user
   * @param {string} userId
   * @returns {RSVP.Promise}
   */
  readResources: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').readResources(userId).then(
        function(response) {
          resolve(service.get('profileSerializer').normalizeReadResources(response));
        },
        reject
      );
    });
  },

  /**
   * Return the list of questions related to a user
   * @param {string} userId
   * @returns {RSVP.Promise}
   */
  readQuestions: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').readQuestions(userId).then(
        function(response) {
          resolve(service.get('profileSerializer').normalizeReadQuestions(response));
        },
        reject
      );
    });
  },

  /**
   * Return the list of collections related to a user
   * @param {string} userId
   * @returns {RSVP.Promise}
   */
  readCollections: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').readCollections(userId).then(
        function(response) {
          resolve(service.get('profileSerializer').normalizeReadCollections(response));
        },
        reject
      );
    });
  },

});
