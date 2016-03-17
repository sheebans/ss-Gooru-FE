import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

/**
 * @class
 * @typedef {Object} AuthApi30
 */
export default BaseAuthenticator.extend({

  authenticationService: Ember.inject.service('api-sdk/authentication'),

  restore: function (data) {
    return Ember.RSVP.resolve(data);
  },

  authenticate: function(options) {
    if (options.isAnonymous) {
      return this.get('authenticationService').authenticateAsAnonymous();
    } else {
      return this.get('authenticationService').authenticateWithCredentials(options.username, options.password);
    }
  }

});
