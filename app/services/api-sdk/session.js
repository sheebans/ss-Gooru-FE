import Ember from "ember";

export default Ember.Service.extend({

  session: Ember.inject.service("session"),

  /**
   * Creates a session with the specified user credentials
   * @param {Ember.Object} credentials - Object with username and password attributes
   * @returns {*|Ember.RSVP.Promise}
   */
  signInWithUser: function(credentials) {
    return this.get("session").authenticate("authenticator:custom", {
      username: credentials.get('username'),
      password: credentials.get('password'),
      isDefaultUser: false
    });
  }

});
