import Ember from 'ember';

export function initialize(application) {
  const sessionService = application.lookup('service:session');

  sessionService.reopen({
    /**
     * @property {string} Session token
     */
    token: Ember.computed('data.authenticated.token', function() {
      return this.get('data.authenticated.token');
    }),

    /**
     * @property {string} Session user data
     */
    userData: Ember.computed('data.authenticated.user', function() {
      return this.get('data.authenticated.user');
    }),

    /**
     * @property {string} Session user id
     */
    userId: Ember.computed('userData', function() {
      return this.get('userData')['gooruUId'];
    }),

    /**
     * @property {boolean} Indicates if the session is for an anonymous user
     */
    isAnonymous:  Ember.computed('data.authenticated', function() {
      return this.get('data.authenticated')['isAnonymous'];
    }),

    /**
     * This method authenticates using the default authenticator for an anonymous user
     * @returns {*|Ember.RSVP.Promise}
     */
    authenticateAsAnonymous: function() {
      return this.authenticate('authenticator:custom', {anonymous: true});
    }
  });
}

export default {
  name: 'gooru-session-service',
  after: 'ember-simple-auth',
  initialize: initialize
};
