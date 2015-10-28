import Ember from "ember";

export default Ember.Service.extend({

  session: Ember.inject.service("session"),


  /**
   * Creates a session with the specified user credentials
   * @returns {*|Ember.RSVP.Promise}
   */
  signInWithUser: function(credentials) {
    return this.get("session").authenticate("authenticator:custom", {
      username: credentials.username,
      password: credentials.password,
      isDefaultUser: false
    });
  }

});
