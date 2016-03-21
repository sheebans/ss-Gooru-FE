import Ember from 'ember';

export default Ember.Service.extend({

  session: Ember.inject.service('session'),

  /**
   * Creates a session with the specified user credentials
   * @param {Ember.Object} credentials - Object with username and password attributes
   * @returns {*|Ember.RSVP.Promise}
   */
  // TODO The useApi3 param is just a temporal solution that will allow us to use API 2.0 or API 3.0 to authenticate
  signInWithUser: function(credentials, useApi3) {
    return this.get('session').authenticate(useApi3 ? 'authenticator:auth-api-3' : 'authenticator:custom', {
      isAnonymous: false,
      username: credentials.get('username'),
      password: credentials.get('password')
    });
  }

});
