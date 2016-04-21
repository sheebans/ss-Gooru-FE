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
      hasAccessToken: false,
      hasUserData: false,
      username: credentials.get('username'),
      password: credentials.get('password')
    });
  },

  /**
   * Creates a session with the specified access token
   * @param token - the access token
   * @returns {*|Ember.RSVP.Promise}
   */
  signInWithToken: function(token) {
    return this.get('session').authenticate('authenticator:auth-api-3', {
      isAnonymous: false,
      hasAccessToken: true,
      hasUserData: false,
      accessToken: token
    });
  },

  /**
   * Creates a session with the specified user
   * @param user - the user data
   * @returns {*|Ember.RSVP.Promise}
   */
  signUp: function(user) {
    return this.get('session').authenticate('authenticator:auth-api-3', {
      isAnonymous: false,
      hasAccessToken: false,
      hasUserData: true,
      user
    });
  },

  /**
   * Updates a session userData
   * @param userData - the user data
   */
  updateUserData: function(userData) {
    const session = this.get('session');
    session.set('userData', userData);
    session.get('store').persist(session.get('data'));
  }

});
