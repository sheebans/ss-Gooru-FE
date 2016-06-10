import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

/**
 * The Ember Simple Auth authenticator for API 3.0
 *
 * @typedef {Object} AuthApi30
 */
export default BaseAuthenticator.extend({

  authenticationService: Ember.inject.service('api-sdk/authentication'),

  restore: function (data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate: function(options) {
    const authenticator = this;
    if (options.isAnonymous) {
      return this.get('authenticationService').authenticateAsAnonymous();
    } else if(options.hasAccessToken) {
      return this.get('authenticationService').authenticateWithToken(options.accessToken);
    } else if(options.hasUserData) {
      return new Ember.RSVP.Promise(function(resolve) {resolve(options.user);});
    } else {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        authenticator.get('authenticationService').authenticateWithCredentials(options.username, options.password)
          .then(resolve, function() {
            // Authenticate as anonymous if it fails to mantain session
            authenticator.get('authenticationService').authenticateAsAnonymous().then(resolve, reject);
          });
      });
    }
  }

});
