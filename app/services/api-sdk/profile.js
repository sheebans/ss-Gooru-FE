import Ember from 'ember';
import ProfileSerializer from 'gooru-web/serializers/profile/profile';
import CourseSerializer from 'gooru-web/serializers/content/course';
import ProfileAdapter from 'gooru-web/adapters/profile/profile';
import ProfileCoursesAdapter from 'gooru-web/adapters/profile/courses';
import AvailabilityAdapter from 'gooru-web/adapters/profile/availability';

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

  i18n: Ember.inject.service(),


  init: function () {
    this._super(...arguments);
    this.set('profileSerializer', ProfileSerializer.create());
    this.set('courseSerializer', CourseSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('profileAdapter', ProfileAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('profileCoursesAdapter', ProfileCoursesAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('availabilityAdapter', AvailabilityAdapter.create(Ember.getOwner(this).ownerInjection()));
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

  /**
   * Checks if the username was already taken
   * @param username
   * @returns {Promise}
   */
  checkUsernameAvailability: function(username) {
    const service = this;
    const i18n = service.get('i18n');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('availabilityAdapter').verifyUsername(username)
        .then(function() {
          reject(i18n.t("sign-up.error-username-taken").string);
        }, function(error) {
           if(error.status===404 || error.status===500 || error.status===200){
            resolve();
          }
          else {
            reject(error);
          }
        });
    });
  },

  /**
   * Checks if the email was already taken
   * @param email
   * @returns {Promise}
   */
  checkEmailAvailability: function(email) {
    const service = this;
    const i18n = service.get('i18n');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('availabilityAdapter').verifyEmail(email)
        .then(function() {
          reject(i18n.t("sign-up.error-email-taken").string);
        }, function(error) {

          if(error.status===404 || error.status===500 || error.status===200){
            resolve();
          }
          else {
            reject(error);
          }
        });
    });
  },

  /**
   * Gets the list of courses created by the profile and filter by subject
   *
   * @param profile the Profile object
   * @param subject the subject to filter the courses
   * @returns {Promise}
   */
  getCourses: function(profile, subject) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileCoursesAdapter').getCourses(profile.get('id'), subject)
        .then(function(response) {
          resolve(service.get('courseSerializer').normalizeGetCourses(response));
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
   * @returns {RSVP.Promise.<Content/Resource>}
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
   * @returns {RSVP.Promise.<Content/Question>}
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
   * @returns {RSVP.Promise.<Content/Collection>}
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

  /**
   * Return the list of assessments related to a user
   * @param {string} userId
   * @returns {RSVP.Promise.<Content/Assessment>}
   */
  readAssessments: function(userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('profileAdapter').readAssessments(userId).then(
        function(response) {
          resolve(service.get('profileSerializer').normalizeReadAssessments(response));
        },
        reject
      );
    });
  }

});
