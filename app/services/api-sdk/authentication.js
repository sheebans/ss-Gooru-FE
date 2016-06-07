import Ember from 'ember';
import AuthenticationSerializer from 'gooru-web/serializers/authentication/authentication';
import AuthenticationAdapter from 'gooru-web/adapters/authentication/authentication';
import ProfileAdapter from 'gooru-web/adapters/profile/profile';

/**
 * Service for the Authentication (Login) with API 3.0
 *
 * @typedef {Object} AuthenticationService
 */
export default Ember.Service.extend({

  authenticationSerializer: null,

  authenticationAdapter: null,

  profileAdapter: null,

  init: function () {
    this._super(...arguments);
    this.set('authenticationSerializer', AuthenticationSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('authenticationAdapter', AuthenticationAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('profileAdapter', ProfileAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Authenticates as an anonymous account
   *
   * @returns {Object} the a normalized response from the endpoint
   */
  authenticateAsAnonymous: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('authenticationAdapter').postAuthentication({
        isAnonymous: true
      }).then(function(response) {
          resolve(service.get('authenticationSerializer').normalizeResponse(response, true));
        }, function(error) {
          reject(error);
        });
    });
  },

  /**
   * Authenticates as a normal user using the credentials
   * @param username account username
   * @param password account password
   * @returns {Object} the normalized response from the endpoint
   */
  authenticateWithCredentials: function(username, password) {
    const service = this;
    var authData;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('authenticationAdapter').postAuthentication({
        isAnonymous: false,
        username: username,
        password: password
      }).then(function(response) {
        authData = service.get('authenticationSerializer').normalizeResponse(response, false);
        return service.get('profileAdapter').readUserProfile(authData.user.gooruUId);
      }).then(function(response) {
        resolve(service.get('authenticationSerializer').normalizeAvatarUrl(response, authData));
      }, function(error) {
        reject(error);
      });
    });
  },

  /**
   * Authenticates as a normal user using access token
   * @param accessToken user access token
   * @returns {Object} the normalized response from the endpoint
   */
  authenticateWithToken: function(accessToken) {
    const service = this;
    var authData;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('authenticationAdapter').postAuthenticationWithToken({
        accessToken
      }).then(function(response) {
        authData = service.get('authenticationSerializer').normalizeResponse(response, false, accessToken);
        return service.get('profileAdapter').readUserProfile(authData.user.gooruUId);
      }).then(function(response) {
        resolve(service.get('authenticationSerializer').normalizeAvatarUrl(response, authData));
      }, function(error) {
        reject(error);
      });
    });
  }

});
