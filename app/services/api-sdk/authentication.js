import Ember from 'ember';

/**
 * Service for the Authentication (Login) with API 3.0
 *
 * @typedef {Object} AuthenticationService
 */
export default Ember.Service.extend({

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
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('authenticationAdapter').postAuthentication({
        isAnonymous: false,
        username: username,
        password: password
      }).then(function(response) {
          resolve(service.get('authenticationSerializer').normalizeResponse(response, false));
        }, function(error) {
          reject(error);
        });
    });
  }

});
